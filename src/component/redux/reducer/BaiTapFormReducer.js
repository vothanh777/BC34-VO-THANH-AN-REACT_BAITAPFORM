const stateDefault = {
  dssv: [],
  dssvTimKiem: [],
  svUpdate: "",
  isAdd: true,
  isDeleted: false,
  isSearching: false,
};

export const BaiTapFormReducer = (state = stateDefault, action) => {
  const { type, payload } = action;
  switch (type) {
    case "THEM_SINH_VIEN": {
      let dssv = [...state.dssv];
      let newSV = dssv.find((sv) => sv.maSV == payload.maSV);

      if (newSV) {
        alert("Mã SV đã tồn tại!");
        return;
      }

      dssv.push(payload);
      return {
        ...state,
        dssv,
        isAdd: true,
        dssvTimKiem: [],
        isDeleted: false,
        isSearching: false,
      };
    }

    case "XOA_SINH_VIEN": {
      let dssv = [...state.dssv];
      dssv = dssv.filter((sv) => sv.maSV != payload);
      console.log(dssv);
      return {
        ...state,
        dssv,
        isAdd: true,
        // dssvTimKiem: [],
        isDeleted: false,
        isSearching: false,
      };
    }

    case "LAY_SINH_VIEN": {
      let dssv = [...state.dssv];
      let svUpdate = dssv.find((sv) => sv.maSV == payload);
      return {
        ...state,
        svUpdate,
        isAdd: false,
        isDeleted: true,
        isSearching: false,
      };
    }

    case "UPDATE_SINH_VIEN": {
      let dssv = [...state.dssv];
      let index = dssv.findIndex((sv) => sv.maSV == payload.maSV);

      dssv[index] = payload;
      return {
        ...state,
        dssv,
        svUpdate: "",
        isAdd: true,
        isDeleted: false,
        isSearching: false,
      };
    }

    case "SEARCH_SINH_VIEN": {
      const dssv = state.dssv;
      let dssvTimKiem = [...state.dssvTimKiem];
      dssvTimKiem = dssv.filter((sv) => {
        let nameLowerCase = sv.hoTen.toLowerCase().trim();
        let keywordLowerCase = payload.toLowerCase().trim();
        if (nameLowerCase.indexOf(keywordLowerCase) !== -1) {
          return sv;
        }
      });
      return { ...state, dssvTimKiem, isSearching: true };
    }

    default:
      return { ...state };
  }
};
