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
    function Channel(name, status, nowStreaming, logo, link) {
        this.name = name;
        this.status = status;
        this.nowStreaming = nowStreaming;
        this.logo = logo;
        this.link = link;
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
        this.requestUrl = "https://wind-bow.gomix.me/twitch-api/";
        this.channels = [];
        this.state = {
            channels: this.channels
        };
        this.updateStatus = this.updateStatus.bind(this);
        this.getChannels();
    }
    ChannelList.prototype.getChannels = function () {
        var that = this;
        channelNames.map(function (channelName) {
            $.getJSON(that.requestUrl + "channels/" + channelName + "?callback=?", function (data) {
                debugger;
                var channel = new Channel(channelName, status, data.status, data.logo, data.url);
                if (data.error == null) {
                    that.updateStatus(channel);
                }
                else {
                    that.channels.push(new Channel(channelName, "no-user", null, null, null));
                    that.setState({ channels: that.channels });
                }
            });
        });
    };
    ChannelList.prototype.updateStatus = function (channel) {
        var that = this;
        $.getJSON(this.requestUrl + "streams/" + channel.name + "?callback=?", function (data) {
            if (data.stream == null) {
                channel.status = "offline";
                channel.nowStreaming = null;
            }
            else {
                channel.status = "online";
            }
            that.channels.push(channel);
            that.setState({ channels: that.channels });
        });
    };
    ChannelList.prototype.render = function () {
        var results = this
            .state["channels"]
            .map(function (channel) {
            return (React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-md-3"}, React.createElement(ChannelLogo, {src: channel.logo})), React.createElement("div", {className: "col-md-7"}, React.createElement("div", null, React.createElement("a", {href: channel.link}, channel.name)), React.createElement("div", {id: "nowStreaming"}, channel.nowStreaming)), React.createElement("div", {className: "col-md-1"}, React.createElement(ChannelStatus, {value: channel.status}))));
        });
        return (React.createElement("div", null, results));
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
            return (React.createElement("i", {className: "fa fa-exclamation-circle fa-2x"}));
        }
        else if (this.props["value"] == "no-user") {
            return (React.createElement("i", {className: "fa fa-user-times fa-2x"}));
        }
        else {
            return (React.createElement("i", {className: "fa fa-check-circle fa-2x"}));
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
