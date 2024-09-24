import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, baseUrl1, baseUrl2 ,baseUrl3} from "../../utils/api";

const dataSlice = createSlice({
  name: "users",
  initialState: {
    value: {
      jobDetails: [],
      companyDetails : [],
      register: [],
      login: [],
      allUsers: [],
      jobData: [],
      companyData : [],
      deleteJob: [],
      deleteUser: [],
      deleteCompany: [],
      deleteSavedJob : {},
      userDetails: {},
      update: {},
      upload: {},
      getJobDetails : {},
      company: {},
      companyJobs : [],
      postSavedJob : {},
      getSavedJob: [],
      postFollowCompany : {},
      getUserFollowedComp:[],
      getSearchJob:[],
      searchOn : false, 
        lastSkill : "",
      savedJobColor : ""

    },
  },
  reducers: {
    searchState : (state,action) => {
      state.value.searchOn = action.payload
    },
    lastSkillStored : (state,action) => {
      state.value.lastSkill = action.payload
    },
    savedJobColorfunc: (state, action) => {
      state.value.savedJobColor = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(postData.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value.jobDetails = action.payload;
    });

    builder.addCase(postData.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(getAllJobs.fulfilled, (state, action) => {
    
      state.value.jobData = action.payload;
    });

    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value.register = action.payload;
    });

    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.value.login = action.payload;
      localStorage.clear();

      const loginDetails = action.payload;
      const keysArr = Object.keys(loginDetails);
      keysArr.forEach((e) => localStorage.setItem(e, loginDetails[e]));
    });

    builder.addCase(LoginUser.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.value.allUsers = action.payload;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.value.userDetails = action.payload;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.value.update = action.payload;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.value.upload = action.payload;
    });

    builder.addCase(uploadImage.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.value.deleteJob = action.payload;
    });

    builder.addCase(deleteJob.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getAllCompanies.fulfilled, (state, action) => {
      state.value.companyData = action.payload;
    });

    builder.addCase(getAllCompanies.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      state.value.deleteCompany = action.payload;
    });

    builder.addCase(deleteCompany.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(postCompany.fulfilled, (state, action) => {
      state.value.companyDetails = action.payload;
    });

    builder.addCase(postCompany.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getJob.fulfilled, (state, action) => {
      state.value.getJobDetails = action.payload;
    });

    builder.addCase(getJob.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getOneCompany.fulfilled, (state, action) => {
      state.value.company = action.payload;
    });

    builder.addCase(getOneCompany.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getCompanyJobs.fulfilled, (state, action) => {
      state.value.companyJobs = action.payload;
    });

    builder.addCase(getCompanyJobs.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(saveJob.fulfilled, (state, action) => {
      state.value.postSavedJob = action.payload;
    });

    builder.addCase(saveJob.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(getUserSaveJobs.fulfilled, (state, action) => {
      state.value.getSavedJob = action.payload;
    });

    builder.addCase(getUserSaveJobs.rejected, (state, action) => {
      state.error = action.error;
    });
    
    builder.addCase(followCompany.fulfilled, (state, action) => {
      state.value.postFollowCompany = action.payload;
    });

    builder.addCase(followCompany.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getUserFollowedComp.fulfilled, (state, action) => {
      state.value.followedCompanies = action.payload;
    });

    builder.addCase(getUserFollowedComp.rejected, (state, action) => {
      state.error = action.error;
    });


    builder.addCase(getSearchJobs.fulfilled, (state,action) =>{
      state.value.getSearchJob= action.payload;
    });
    builder.addCase(getSearchJobs.rejected, (state,action) =>{
      state.error= action.error;
    });
    
    builder.addCase(delUserSavedJob.fulfilled, (state,action) =>{
      state.value.deleteSavedJob= action.payload;
    });
    builder.addCase(delUserSavedJob.rejected, (state,action) =>{
      state.error= action.error;
    });

  },
});

export const postData = createAsyncThunk("postData", async (arg) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(baseUrl + "/jobs/add", arg, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});
export const getAllJobs = createAsyncThunk("getAllJObs", async (args) => {
  const { data } = await axios.get(baseUrl + "/jobs/getAll");
  return data;
});
export const deleteJob = createAsyncThunk("deleteJob", async ({ jobId }) => {
  console.log(jobId);
  const userId  = localStorage.getItem("userId")
  const token = localStorage.getItem("token");
  const { data } = await axios.delete(baseUrl + `/jobs/delete?jobId=${jobId}&userId=${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});
export const RegisterUser = createAsyncThunk("register", async (e) => {
  const { data } = await axios.post(baseUrl1 + "/users/register", e);
  return data;
});

export const LoginUser = createAsyncThunk("login", async (e) => {
  const { data } = await axios.post(baseUrl1 + "/users/login", e);
  return data;
});

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const { data } = await axios.get(baseUrl1 + "/users/getAll");
  return data;
});

export const getUser = createAsyncThunk("getUser", async ({ userId }) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(baseUrl1 + "/users/getUser/" + userId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});

export const updateUser = createAsyncThunk("updateUser", async (arg) => {
  console.log(arg);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { data } = await axios.patch(
    baseUrl1 + "/users/updateUser/" + userId,
    arg
    // {
    // headers: {
    //   Authorization : "Bearer " + token
    // }
    // }
  );
  return data;
});
export const deleteUser = createAsyncThunk("deleteUser", async ({ userId }) => {
  console.log(userId);
  const token = localStorage.getItem("token");
  const { data } = await axios.delete(baseUrl1 + "/users/delete/" + userId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});

export const deleteCompany = createAsyncThunk("deleteCompany", async ({ cid }) => {
  console.log(cid);
  const token = localStorage.getItem("token");
  const { data } = await axios.delete(baseUrl2 + "/company/delete/" + cid, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});

export const getOneCompany = createAsyncThunk("getCOmpany", async ({ cid }) => {
 
  const { data } = await axios.get(baseUrl2 + "/company/getCompany/" + cid);
  return data;
});
export const uploadImage = createAsyncThunk("cloudinary", async (arg) => {
  
  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/dzeek4uww/image/upload",
    arg
  );
  return data;
});

export const getAllCompanies = createAsyncThunk("getAllCompanies", async() => {
  const {data} = await axios.get(baseUrl2 + "/company/getall")
  return data
})

export const getJob = createAsyncThunk("getJobDetails", async({jobId}) => {
  const {data} = await axios.get(baseUrl + "/jobs/get/" + jobId)
  return data
})

export const getCompanyJobs  = createAsyncThunk("getCompanyJobs", async({cid}) => {
  const {data} = await axios.get(baseUrl2 + "/company/getCompanyJobs/" + cid)
  return data
})


export const postCompany = createAsyncThunk("postCompany", async (arg) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(baseUrl2 + "/company/add", arg, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});

export const saveJob = createAsyncThunk("saveJob", async({jobId}) => {
  const userId = localStorage.getItem("userId")
   const token = localStorage.getItem("token");
   console.log(jobId);
   const {data} = await axios.post(baseUrl + `/jobs/saveJob/${jobId}`, {userId : userId},
   {
    headers: {
      Authorization : "Bearer " + token
    }
   }  );
   return data;
})

export const getUserSaveJobs = createAsyncThunk("getUserSavedJobs",async({userId}) => {
  
  const token = localStorage.getItem("token")
  const {data} = await axios.get(baseUrl + "/jobs/savedJobs/all/" + userId,
  {
    headers : {
      Authorization : "Bearer " + token
    }
  });
  return data;
})

export const delUserSavedJob = createAsyncThunk("delUserSavedJob",async({jobId}) => {
  
  const {token,userId} = localStorage;
  const {data} = await axios.delete(baseUrl + `/jobs/savedJobs/delone/${jobId}/${userId}`,
  {
    headers : {
      Authorization : "Bearer " + token
    }
  });
  return data;
})

export const followCompany = createAsyncThunk("followCompany", async({cid}) => {
  const userId = localStorage.getItem("userId")
   const token = localStorage.getItem("token");
  
   const {data} = await axios.post(baseUrl2 + `/company/followComp/${cid}`, {userId : userId},
   {
    headers: {
      Authorization : "Bearer " + token
    }
   }  );
   return data;
})
export const getUserFollowedComp = createAsyncThunk("UserFollowedCOmpanies", async({userId}) => {
  const token = localStorage.getItem("token");

  const {data} = await axios.get(baseUrl2 +"/company/followedComp/" + userId,
  {
    headers : {
      Authorization : "Bearer " + token
    }
  })
  return data;
})

export const getSearchJobs = createAsyncThunk("getSearchJobs", async({searchedInput}) => {
  const {data} = await axios.get(baseUrl3 + "/search/search?search="+searchedInput)
  return data
})
export const { searchState,lastSkillStored ,savedJobColorfunc} = dataSlice.actions;
export default dataSlice.reducer;