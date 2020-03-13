object FMain: TFMain
  Left = 0
  Top = 0
  BorderStyle = bsSingle
  Caption = 'FMain'
  ClientHeight = 313
  ClientWidth = 296
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'Tahoma'
  Font.Style = []
  OldCreateOrder = False
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 13
  object Memo1: TMemo
    Left = 0
    Top = 91
    Width = 296
    Height = 222
    Align = alBottom
    Lines.Strings = (
      'Memo1')
    ScrollBars = ssVertical
    TabOrder = 0
    ExplicitTop = 79
  end
  object Panel1: TPanel
    Left = 0
    Top = 0
    Width = 296
    Height = 41
    Align = alTop
    Caption = 'Panel1'
    ShowCaption = False
    TabOrder = 1
    object btnActivate: TButton
      Left = 158
      Top = 9
      Width = 75
      Height = 25
      Caption = 'open'
      TabOrder = 0
      OnClick = btnActivateClick
    end
    object EditPort: TEdit
      Left = 8
      Top = 11
      Width = 121
      Height = 21
      NumbersOnly = True
      TabOrder = 1
      Text = '8080'
    end
  end
  object RESTServicePooler1: TRESTServicePooler
    Active = False
    CORS = False
    CORS_CustomHeaders.Strings = (
      
        'Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTI' +
        'ONS'
      
        'Access-Control-Allow-Headers:Content-Type, Origin, Accept, Autho' +
        'rization, X-CUSTOM-HEADER')
    RequestTimeout = -1
    ServicePort = 8080
    ProxyOptions.Port = 8888
    ServerParams.HasAuthentication = False
    ServerParams.UserName = 'testserver'
    ServerParams.Password = 'testserver'
    SSLMethod = sslvSSLv2
    SSLVersions = []
    Encoding = esUtf8
    ServerContext = 'restdataware'
    RootPath = '/'
    SSLVerifyMode = []
    SSLVerifyDepth = 0
    ForceWelcomeAccess = False
    CriptOptions.Use = False
    CriptOptions.Key = 'RDWBASEKEY256'
    MultiCORE = True
    Left = 208
    Top = 248
  end
end
