/// <reference path="typings/react.d.ts" /> 
/// <reference path="typings/react.dom.d.ts" /> 
/// <reference path="typings/jquery.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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

var Channel = (function () {
    function Channel(name, status, nowStreaming, logo) {
        this.name = name;
        this.status = status;
        this.nowStreaming = nowStreaming;
        this.logo = logo;
        this.name = name;
        this.status = status;
        this.nowStreaming = nowStreaming;
        this.logo = logo;
    }
    return Channel;
}());
var ChannelList = (function (_super) {
    __extends(ChannelList, _super);
    function ChannelList() {
        _super.call(this);
        var channels = [];
        this.state = {
            channels: channels
        };
        this.fetch();
    }
    ChannelList.prototype.fetch = function () {
        var requestUrl = "https://wind-bow.gomix.me/twitch-api/streams/";
        var that = this;
        var channels = [];
        channelNames.map(function (channelName) {
            $
                .getJSON(requestUrl + channelName + "?callback=?", function (data) {
                if (data.stream == null) {
                    if (data.error == null) {
                        channels.push(new Channel(channelName, "offline", null, null));
                    }
                    else {
                        channels.push(new Channel(channelName, "no-user", null, null));
                    }
                    that.setState({ channels: channels });
                }
                else {
                    channels.push(new Channel(channelName, "online", data.stream.game, data.stream.channel.logo));
                    that.setState({ channels: channels });
                }
            });
        });
    };
    ChannelList.prototype.render = function () {
        var results = this
            .state["channels"]
            .map(function (channel) {
            return (React.createElement("li", null, React.createElement(ChannelLogo, {src: channel.logo}), channel.name, React.createElement(ChannelStatus, {value: channel.status})));
        });
        return (React.createElement("div", null, React.createElement("ul", null, results)));
    };
    return ChannelList;
}(React.Component));
var ChannelStatus = (function (_super) {
    __extends(ChannelStatus, _super);
    function ChannelStatus(props) {
        _super.call(this);
    }
    ChannelStatus.prototype.render = function () {
        if (this.props["value"] == "offline") {
            return (React.createElement("i", {className: "fa fa-check-circle fa-2x"}));
        }
        else {
            return (React.createElement("i", {className: "fa fa-exclamation-circle fa-2x"}));
        }
    };
    return ChannelStatus;
}(React.Component));
var ChannelLogo = (function (_super) {
    __extends(ChannelLogo, _super);
    function ChannelLogo(props) {
        _super.call(this);
    }
    ChannelLogo.prototype.render = function () {
        if (this.props["src"] == null) {
            return (React.createElement("span", {className: "img-thumbnail text-center"}, React.createElement("i", {className: "fa fa-picture-o fa-2x", id: "thumbnail"})));
        }
        else {
            return (React.createElement("img", {src: this.props["src"], className: "img-thumbnail"}));
        }
    };
    return ChannelLogo;
}(React.Component));
ReactDOM.render(React.createElement(ChannelList, null), document.getElementById("channelList"));
