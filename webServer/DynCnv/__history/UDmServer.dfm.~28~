object DMServer: TDMServer
  OldCreateOrder = False
  Encoding = esASCII
  Height = 150
  Width = 215
  object api: TDWServerEvents
    IgnoreInvalidParams = False
    Events = <
      item
        Routes = [crAll]
        DWParams = <>
        JsonMode = jmPureJSON
        Name = 'ver'
        OnReplyEventByType = apiEventsverReplyEventByType
      end
      item
        Routes = [crGet]
        DWParams = <>
        JsonMode = jmPureJSON
        Name = 'dyncnv'
        OnReplyEventByType = apiEventsdyncnvReplyEventByType
      end
      item
        Routes = [crAll]
        DWParams = <>
        JsonMode = jmPureJSON
        Name = 'dynmnlz'
        OnReplyEventByType = apiEventsdynmnlzReplyEventByType
      end
      item
        Routes = [crAll]
        DWParams = <
          item
            TypeObject = toParam
            ObjectDirection = odINOUT
            ObjectValue = ovString
            ParamName = 'days'
            Encoded = True
            DefaultValue = '0'
          end
          item
            TypeObject = toParam
            ObjectDirection = odINOUT
            ObjectValue = ovString
            ParamName = 'type'
            Encoded = True
            DefaultValue = 'all'
          end
          item
            TypeObject = toParam
            ObjectDirection = odINOUT
            ObjectValue = ovString
            ParamName = 'rowstart'
            Encoded = True
            DefaultValue = '0'
          end
          item
            TypeObject = toParam
            ObjectDirection = odINOUT
            ObjectValue = ovString
            ParamName = 'rowend'
            Encoded = True
            DefaultValue = '10'
          end>
        JsonMode = jmPureJSON
        Name = 'him'
        OnReplyEventByType = apiEventshimReplyEventByType
      end>
    Left = 16
    Top = 16
  end
end
