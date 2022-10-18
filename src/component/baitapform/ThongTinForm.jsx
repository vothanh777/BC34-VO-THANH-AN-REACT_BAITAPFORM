import { data } from "autoprefixer";
import React, { Component } from "react";
import { connect } from "react-redux";

class ThongTinForm extends Component {
  state = {
    sv: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    error: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
  };

  handleChange = (event) => {
    const { sv, error } = this.state;
    let { name, value, type } = event.target;
    sv[name] = value;

    if (value.trim() == "") {
      error[name] = name + " không được để trống";
    } else {
      error[name] = "";
    }

    if (type == "email") {
      const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!regexEmail.test(value)) {
        error[name] = name + " không đúng định dạng!";
      } else {
        error[name] = "";
      }
    }

    if (name == "soDienThoai") {
      const numbers = /^[0-9]+$/;
      if (!numbers.test(value)) {
        error[name] = name + " phải là ký tự số!";
      } else {
        error[name] = "";
      }
    }

    this.setState({
      sv,
      error,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { sv, error } = this.state;
    let { isAdd } = this.props;
    let isValid = true;

    for (const key in sv) {
      if (sv[key] == "") {
        isValid = false;
      }
    }

    for (const key in error) {
      if (error[key] != "") {
        isValid = false;
      }
    }

    if (!isValid) {
      alert("Dữ liệu chưa hợp lệ!");
      return;
    }
    if (isAdd) {
      this.props.dispatch({
        type: "THEM_SINH_VIEN",
        payload: sv,
      });
    } else {
      this.props.dispatch({
        type: "UPDATE_SINH_VIEN",
        payload: sv,
      });
    }
    this.setState({
      sv: {
        maSV: "",
        hoTen: "",
        soDienThoai: "",
        email: "",
      },
    });
  };

  static getDerivedStateFromProps(newProps, currentState) {
    if (
      newProps.svUpdate != "" &&
      newProps.svUpdate.maSV != currentState.sv.maSV
    ) {
      return { ...currentState, sv: newProps.svUpdate };
    }
  }

  render() {
    let { isAdd } = this.props;
    return (
      <div className="col-12">
        <h2 className="bg-dark text-white p-2">Thông tin sinh viên</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-6 form-group">
              <label>Mã SV</label>
              <input
                disabled={isAdd == false ? "disabled" : ""}
                value={this.state.sv.maSV}
                name="maSV"
                type="text"
                onChange={this.handleChange}
              />
              <span className="text-danger">{this.state.error.maSV}</span>
            </div>
            <div className="col-6 form-group">
              <label>Họ tên</label>
              <input
                value={this.state.sv.hoTen}
                name="hoTen"
                type="text"
                onChange={this.handleChange}
              />
              <span className="text-danger">{this.state.error.hoTen}</span>
            </div>
            <div className="col-6 form-group">
              <label>Số điện thoại</label>
              <input
                value={this.state.sv.soDienThoai}
                name="soDienThoai"
                type="text"
                onChange={this.handleChange}
              />
              <span className="text-danger">
                {this.state.error.soDienThoai}
              </span>
            </div>
            <div className="col-6 form-group">
              <label>Email</label>
              <input
                value={this.state.sv.email}
                name="email"
                type="email"
                onChange={this.handleChange}
              />
              <span className="text-danger">{this.state.error.email}</span>
            </div>
            <div className="col-12">
              {isAdd == true ? (
                <button className="btn btn-success">Thêm sinh viên</button>
              ) : (
                <>
                  <button className="btn btn-primary">Cập nhật</button>{" "}
                  <button className="btn btn-danger">Cancel</button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dssv: state.BaiTapFormReducer.dssv,
    svUpdate: state.BaiTapFormReducer.svUpdate,
    isAdd: state.BaiTapFormReducer.isAdd,
  };
};

export default connect(mapStateToProps, null)(ThongTinForm);
