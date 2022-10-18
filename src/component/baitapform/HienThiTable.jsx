import React, { Component } from "react";
import { connect } from "react-redux";

class HienThiTable extends Component {
  handleSearch = (event) => {
    let { value } = event.target;

    this.props.dispatch({
      type: "SEARCH_SINH_VIEN",
      payload: value,
    });
  };

  renderTable = () => {
    let { dssv, dssvTimKiem, isDeleted, isSearching } = this.props;
    let arrSV = [];

    console.log(dssvTimKiem);
    if (isSearching) {
      arrSV = dssvTimKiem;
    } else {
      arrSV = dssv;
    }
    // console.log(arrSV);

    return arrSV.map((sv, index) => {
      return (
        <tr key={index}>
          <td>{sv.maSV}</td>
          <td>{sv.hoTen}</td>
          <td>{sv.soDienThoai}</td>
          <td>{sv.email}</td>
          <td>
            <button
              onClick={() => {
                this.props.dispatch({
                  type: "LAY_SINH_VIEN",
                  payload: sv.maSV,
                });
              }}
              className="btn btn-primary mx-2"
            >
              Sửa
            </button>
            <button
              disabled={isDeleted ? "disabled" : ""}
              onClick={() =>
                this.props.dispatch({
                  type: "XOA_SINH_VIEN",
                  payload: sv.maSV,
                })
              }
              className="btn btn-danger"
            >
              Xoá
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    // let arrSV = [];
    // if (dssvTimKiem.length != 0) {
    //   arrSV = dssvTimKiem;
    // } else {
    //   arrSV = dssv;
    // }

    return (
      <div className="col-12 mt-3">
        <div className="row">
          <div className="col-6 mb-2 mx-0">
            <input
              onChange={this.handleSearch}
              type="text"
              className="form-control"
              name="search"
              placeholder="Search"
            />
          </div>
        </div>

        <table className="table">
          <thead className="bg-dark text-white">
            <tr>
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dssv: state.BaiTapFormReducer.dssv,
    dssvTimKiem: state.BaiTapFormReducer.dssvTimKiem,
    isDeleted: state.BaiTapFormReducer.isDeleted,
    isSearching: state.BaiTapFormReducer.isSearching,
  };
};

export default connect(mapStateToProps, null)(HienThiTable);
