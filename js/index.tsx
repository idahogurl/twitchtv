/// <reference path="typings/react.d.ts" /> 
/// <reference path="typings/react.dom.d.ts" /> 
/// <reference path="typings/jquery.d.ts" />

var channelNames = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "brunofin",
  "comster404"
];

import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Channel {
  constructor(public name : string, public status : string, 
  public nowStreaming : string, public logo : string, public link : string) {
    this.name = name;
    this.status = status;
    this.nowStreaming = nowStreaming;
    this.logo = logo;
  }
}
class ChannelList extends React.Component < any,
any > {
  requestUrl : string;
  channels : Channel[]
  
  constructor() {
    super();
    this.requestUrl = "https://wind-bow.gomix.me/twitch-api/";

    this.channels= [];
    this.state = {
      channels: this.channels
    };

    this.updateStatus = this.updateStatus.bind(this);   

    this.getChannels();     
  }

  getChannels() {    
    var that = this;
    
    channelNames.map(function (channelName) {
      $.getJSON(that.requestUrl + "channels/" + channelName + "?callback=?", function (data) {
          debugger;
            let channel = new Channel(channelName, status, data.status, data.logo, data.url);
            if (data.error == null) {
              that.updateStatus(channel);            
            } else {
              that.channels.push(new Channel(channelName, "no-user", null, null, null));
              that.setState({channels: that.channels});
            }
        });
    });
  }

  updateStatus(channel : Channel) {
      var that = this;
      $.getJSON(this.requestUrl + "streams/" + channel.name + "?callback=?", function (data) {
          if (data.stream == null) {
             channel.status = "offline";
             channel.nowStreaming = null;
          } else {
            channel.status = "online";
          }
          that.channels.push(channel);
          that.setState({channels: that.channels});
      });
  }

  render() {
    var results = this
      .state["channels"]
      .map(function (channel : Channel) {
         return (
           <div className="row">
            <div className="col-md-3">
              <ChannelLogo src={channel.logo} />
            </div>
            <div className="col-md-7">
              <div><a href={channel.link}>{channel.name}</a></div>
              <div id="nowStreaming">{channel.nowStreaming}</div> 
            </div>
            <div className="col-md-1">
              <ChannelStatus value={channel.status} />
            </div>
            </div>
          );        
      });

    return (
      <div>        
          {results}        
      </div>
    );
  }
}

class ChannelStatus extends React.Component<any,any> {
 constructor(props : any) {
    super();
 }

  render() {
   if (this.props["value"] == "offline") {
      return (<i className="fa fa-exclamation-circle fa-2x"></i>);      
   } else if (this.props["value"] == "no-user") {
     return (<i className="fa fa-user-times fa-2x"></i>);
   } else {
      return (<i className="fa fa-check-circle fa-2x"></i>);
    }
  }
}

class ChannelLogo extends React.Component<any, any> {
  
  constructor(props : any) {
    super();
  }

  render() {
    if (this.props["src"] == null) {
      return (<span className="img-thumbnail text-center">
                <i className="fa fa-picture-o fa-2x" id="thumbnail"></i></span>);
    } else {
      return (<img src={this.props["src"]} className="img-thumbnail"/>);
    }
  }
}

ReactDOM.render(
  <ChannelList/>, document.getElementById("channelList"));