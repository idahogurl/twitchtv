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
  constructor(public name : string, public status : string, public nowStreaming : string, public logo : string) {
    this.name = name;
    this.status = status;
    this.nowStreaming = nowStreaming;
    this.logo = logo;
  }
}
class ChannelList extends React.Component < any,
any > {
  constructor() {
    super();
    var channels : Channel[] = [];
    this.state = {
      channels: channels
    };

    this.fetch();
  }

  fetch() {
    var requestUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
    var that = this;
    var channels : Channel[] = [];

    channelNames.map(function (channelName) {
      $
        .getJSON(requestUrl + channelName + "?callback=?", function (data) {

          if (data.stream == null) {
            if (data.error == null) {
              channels.push(new Channel(channelName, "offline", null, null));
            } else {
              channels.push(new Channel(channelName, "no-user", null, null));
            }
            that.setState({channels: channels});
          } else {
            channels.push(new Channel(channelName, "online", data.stream.game, data.stream.channel.logo));
            that.setState({channels: channels});
          }
        });
    });
  }

  render() {
    var results = this
      .state["channels"]
      .map(function (channel : Channel) {
         return (
            <li>
              <ChannelLogo src={channel.logo} />
              {channel.name} 
              
              <ChannelStatus value={channel.status} />
            </li>
          );        
      });

    return (
      <div>
        <ul>
          {results}
        </ul>
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
      return (<i className="fa fa-check-circle fa-2x"></i>);
    } else {
      return (<i className="fa fa-exclamation-circle fa-2x"></i>);
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