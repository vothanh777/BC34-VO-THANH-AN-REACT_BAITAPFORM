import React, { Component } from "react";
import "./baitapform.css";
import HienThiTable from "./HienThiTable";
import ThongTinForm from "./ThongTinForm";

export default class BaiTapForm extends Component {
  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <ThongTinForm />
          <HienThiTable />
        </div>
      </div>
    );
  }
}
