unit UDbClasses;

interface

uses
  System.IOUtils, System.SysUtils, System.Classes, Data.DB, MemDS, DBAccess,
  Ora, OraCall,
  System.Generics.Collections, System.JSON, Vcl.ExtCtrls;

type
  IQueryToJson = interface
    // function QueryToJson: TJsonArray;
    procedure RefreshData;
    function GetData: TJsonArray;
  end;

  TAggrJson = class(TInterfacedObject, IQueryToJson)
  private
    FData: TJsonArray;
    Session: TOraSession;
    Query: TOraQuery;
    function QueryOpen: boolean;
    procedure SetData; virtual; abstract;
  public
    function QueryToJson: TJsonArray;
    procedure RefreshData; virtual;
    destructor Destroy; override;
    property Data: TJsonArray read FData write FData;
    constructor Create;
    function GetData: TJsonArray; virtual;
  end;

  TJsonCnv = class(TAggrJson)
  private
    function JsonElements: TJsonArray;
    procedure SetData; override;
  public

    constructor Create;
  end;

  TJsonMnlz = class(TAggrJson)
  private
    Params: TDictionary<Integer, String>;
    function CreateParamsDic: TDictionary<Integer, string>;
    procedure SetData; override;
  public
    destructor Destroy; override;
    constructor Create;
  end;

  TJsonHim = class(TAggrJson)
  private
    Params: TDictionary<String, String>;
    Function CreateParamsDic: TDictionary<String, String>;
    procedure SetData; override;
  public
    // function QueryToJson: TJsonArray; override;
    destructor Destroy; override;
    constructor Create;
  end;

  TDM = class(TDataModule)
    DBAsutp: TOraSession;
    qDynMnlz: TOraQuery;
    qDynCnv: TOraQuery;
    DBHim: TOraSession;
    qHim: TOraQuery;
    procedure DataModuleCreate(Sender: TObject);
    procedure Timer1Timer(Sender: TObject);
  private
    procedure GetSettings;
    { Private declarations }
  public
    JsonMnlz: IQueryToJson;
    JsonCnv: IQueryToJson;
    JsonHim: IQueryToJson;
    { Public declarations }
  end;

var
  DM: TDM;

implementation

uses
  System.StrUtils;

{%CLASSGROUP 'Vcl.Controls.TControl'}
{$R *.dfm}
{ TAggrJson }

constructor TAggrJson.Create;
begin
  Data := TJsonArray.Create;
  QueryToJson;
end;

destructor TAggrJson.Destroy;
begin
  FData.DisposeOf;
  inherited;
end;

function TAggrJson.GetData: TJsonArray;
begin
  RefreshData;
  Result := Data;
end;

function TAggrJson.QueryOpen: boolean;
begin
  try
    if not Session.Connected then
      Session.Connect;
    if not Query.Active then
      Query.open;
    Result := True;
  except
    Result := false;
  end;
end;

function TAggrJson.QueryToJson: TJsonArray;
begin
  if not QueryOpen then
    exit(nil);
  SetData;
  Result := FData;
end;

procedure TAggrJson.RefreshData;
begin
  if not Session.Connected then
    Session.Connect;
  Query.Close;
  Query.open;
  QueryToJson;
end;

{ TJsonMnlz }

constructor TJsonMnlz.Create;
begin
  Params := CreateParamsDic;
  Session := DM.DBAsutp;
  Query := DM.qDynMnlz;
  inherited;
end;

procedure TJsonMnlz.SetData;
var
  I: Integer;
  JsonObject: TJSONObject;
  num: string;
  getParamsName: boolean;
  idmsg: string;
begin
  FData.DisposeOf;
  FData := TJsonArray.Create;
  // if Query.IsEmpty then
  // exit(nil);
  for I := 1 to 4 do
  begin
    JsonObject := TJSONObject.Create;
    Query.First;
    num := '_' + I.ToString;
    JsonObject.AddPair('num_pl', Query.FieldByName('PL_NUM' + num).AsString);
    while not Query.Eof do
    begin
      getParamsName := Params.TryGetValue(Query.FieldByName('ID_MSG')
        .AsInteger, idmsg);
      if getParamsName then
        JsonObject.AddPair(idmsg, Query.FieldByName('MSG' + num).AsString);
      Query.Next;
    end;
    FData.AddElement(JsonObject);
  end;
end;

destructor TJsonMnlz.Destroy;
begin
  FreeAndNil(Params);
  inherited;
end;

Function TJsonMnlz.CreateParamsDic
  : System.Generics.Collections.TDictionary<Integer, string>;
begin
  Result := TDictionary<Integer, String>.Create;
  with Result do
  begin
    Add(250, 'V,м/мин');
    Add(260, 'V2');
    Add(251, 'L, м');
    Add(261, 'Len2');
    Add(255, 'Вес СК,т');
    Add(254, 'Т ͦ ,С');
    Add(252, 't,мин');
    Add(258, '№ в сер.');
    Add(256, 'Вес ПК,т');
  end;
end;

{ TJsonCnv }

constructor TJsonCnv.Create;
begin
  Session := DM.DBAsutp;
  Query := DM.qDynCnv;
  inherited;
end;

procedure TJsonCnv.SetData;
begin
  FData.DisposeOf;
  FData := JsonElements;
end;

function TJsonCnv.JsonElements: TJsonArray;
var
  name: string;
  code_oper: string;
  I: Integer;
  num: string;
  JObjValue: TJSONObject;
begin
  Result := TJsonArray.Create;
  for I := 1 to 3 do
  begin
    JObjValue := TJSONObject.Create;
    num := '_' + I.ToString;
    JObjValue.AddPair('PL_NUM', Query.FieldByName('PL_NUM' + num).AsString);
    name := Query.FieldByName('name' + num).AsString;
    JObjValue.AddPair('name', ifthen(name = '', 'Простой', name));
    code_oper := Query.FieldByName('code_oper' + num).AsString;
    JObjValue.AddPair('code_oper', ifthen(code_oper = '', '1', code_oper));
    Result.AddElement(JObjValue);
  end;

end;

procedure TDM.DataModuleCreate(Sender: TObject);
begin
  GetSettings;
  JsonCnv := TJsonCnv.Create;
  JsonMnlz := TJsonMnlz.Create;
  JsonHim := TJsonHim.Create;
end;

procedure TDM.Timer1Timer(Sender: TObject);
begin
  JsonMnlz.RefreshData;
  JsonCnv.RefreshData;
end;

procedure TDM.GetSettings;
var
  config: TJSONValue;
  configFile: string;
begin
  configFile := 'settings.json';
  if TFile.Exists(configFile) then
  begin
    try
      try
        config := TJSONObject.ParseJSONValue
          (TFile.ReadAllText(configFile), True);
        // config.TryGetValue('demo', Demo);
      except
      end;
    finally
      FreeAndNil(config);
    end;
  end;
end;

{ TJsonCnvDemo }
{ *
  function TJsonCnvDemo.GetData: TJsonArray;
  begin
  Result := QueryToJson;
  end;

  function TJsonCnvDemo.QueryToJson: TJsonArray;
  var
  JsonObject: TJSONObject;
  I: Integer;
  name: Array of String;
  codeOper: Array of Integer;
  rm: Integer;
  num: string;
  begin
  name := ['Нет дутья', 'Простой', 'Разогрев', 'Завалка', 'Продувка',
  'Додувка 1', 'Замер/проба 1', 'Слив шлака', 'Слив стали'];
  codeOper := [80, 1, 2, 3, 4, 5, 20, 40, 50];

  FData.DisposeOf;
  FData := TJsonArray.Create;
  JsonObject := TJSONObject.Create;
  for I := 1 to 3 do
  begin
  num := '_' + I.ToString;
  rm := random(9);
  JsonObject.AddPair('num_pl' + num, (I * 10000 + random(1000)).ToString);
  JsonObject.AddPair('name' + num, name[rm]);
  JsonObject.AddPair('code_oper' + num, codeOper[rm].ToString);
  end;
  FData.AddElement(JsonObject);
  Result := FData;
  end;

  procedure TJsonCnvDemo.RefreshData;
  begin
  QueryToJson;
  end;     * }

{ TJsonHim }

constructor TJsonHim.Create;
begin
  Session := DM.DBHim;
  Query := DM.qHim;
  Params:=CreateParamsDic;
  inherited;
end;

function TJsonHim.CreateParamsDic: TDictionary<String, String>;
var
  Keys, Names: array of string;
  i:integer;
begin
  Keys := ['TIPPROBY', 'DT','TM', 'NPLAV', 'NPROB', 'C', 'MN', 'SI', 'S', 'P',
    'CR', 'NI', 'CU', 'TI', 'AL', 'ALSOL', 'AS_', 'N', 'W', 'MO', 'V', 'CA',
    'NB', 'B', 'CO', 'MGO', 'CAO', 'SIO2', 'FE', 'FEOK', 'P2O5', 'AL2O3', 'MNO',
    'OCH1', 'SN', 'PB', 'ZN'];
  Names := ['Тип пробы', 'Дата','Время',  '№ плавки', '№ пробы', 'C', 'Mn', 'Si', 'S', 'P',
    'Cr', 'Ni', 'Cu', 'Ti', 'Al', 'AlSol', 'As', 'N', 'W', 'Mo', 'V', 'Ca',
    'Nb', 'B', 'Co', 'MgO', 'CaO', 'SiO2', 'Fe', 'FeO', 'P2O5', 'Al2O3', 'MnO',
    'Осн.', 'Sn', 'Pb', 'Zn'];
    Result:=TDictionary<String,String>.Create;
    for I := 0 to Length(Keys) - 1 do
    begin
      Result.AddOrSetValue(Keys[i],Names[i]);
    end;
end;

destructor TJsonHim.Destroy;
begin
  FreeAndNil(Params);
  inherited;
end;

procedure TJsonHim.SetData;
var
  Field: TField;
  JsonObject: TJSONObject;
  name: string;
begin
  FData.DisposeOf;
  FData := TJsonArray.Create;
  Query.First;
  while not Query.Eof do
  begin
    JsonObject := TJSONObject.Create;
    for Field in Query.Fields do
    begin
     if not Params.TryGetValue(Field.FieldName,name) then
     name:=Field.FieldName;
      JsonObject.AddPair(name, Field.AsString);
    end;
    FData.AddElement(JsonObject);
    Query.Next;
  end;
end;

end.
