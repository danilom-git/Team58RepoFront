import React, { Component } from "react";

class MainComp extends React.Component{
    state={ toRender: false}

    handleRend = () => {
        this.setState({toRender:true});
    }

    render() {
        return (<main className="col">{this.toRender && <div></div>}</main>);
    }
}

export  default MainComp;