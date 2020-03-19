program DynCnv;

uses
  Vcl.Forms,
  Main in 'Main.pas' {FMain} ,
  uDWDatamodule in 'uDWDatamodule.pas' {ServerMethodDataModule: TDataModule} ,
  UDmServer in 'UDmServer.pas' {DMServer: TServerMethodDataModule} ,
  UDbClasses in 'UDbClasses.pas' {DM: TDataModule};

{$R *.res}

begin
  ReportMemoryLeaksOnShutdown := DebugHook <> 0;
  Application.Initialize;
  Application.MainFormOnTaskbar := True;
  Application.CreateForm(TDM, DM);
  Application.CreateForm(TFMain, FMain);
  Application.CreateForm(TDMServer, DMServer);

  Application.Run;

end.
