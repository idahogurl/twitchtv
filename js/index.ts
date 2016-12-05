/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/jquery.d.ts" />

var channelNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
"brunofin","comster404"];
import React, {Component} from 'react';
import ReactDOM from 'react-dom'

class ChannelList extends React.Component<any,any>  {
  constructor(props){
        super(props);
        this.state = { channels: [] };
        this.fetch = this.fetch.bind(this);
        this.setChannelList = this.setChannelList.bind(this);
    
      this.fetch();
  }
  
  render() {
  return (
    <ul><li></li></ul>
     );
  }
  
  fetch() {
 
    var requestUrl = "https://wind-bow.hyperdev.space/twitch-api/streams/";
    var self = this;
    var channels : Channel[] = [];
    
    channelNames.map(function(channelName) {
      $.getJSON(requestUrl + channelName + "?callback=?", function(data) {
        let status : string = "Online";
        
        channels.push(new Channel(channelName, status, data.stream.game, data.stream.logo));
});
      
    });
  }
  
  setChannelList(response: any) {
 
    //this.setState({
        //channels: results
      //});
  }
  
  
}

class Channel {
  constructor(public name:string, public status : string, public nowStreaming : string, public logo : string ) {
    this.name = name;
    this.status = status;
    this.nowStreaming = nowStreaming;
    this.logo = logo;
  }
}
  
  ReactDOM.render(<ChannelList />,  document.getElementById("articleSearch"));
