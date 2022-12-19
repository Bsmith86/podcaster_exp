import React, { useEffect, useState, useContext } from 'react';
import './index.css';
// import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import ReactLoading from 'react-loading';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

// import {API} from 'aws-amplify';
import { Storage } from "@aws-amplify/storage";
import Amplify, { API, Auth } from 'aws-amplify';

import AWS from 'aws-sdk'

import axios from 'axios';
import { CognitoIdentityProviderClient, AddCustomAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";



const Upload = () => {

  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const params = {
    "AttributesToGet": [],
    "Filter": "",
    "Limit": 10,
    "UserPoolId": "us-east-1_kscJjnZUJ",
    "Credential": "helo"
}
const command = new AddCustomAttributesCommand(params);

useEffect( () => {
  
  let usersfunc = async () => {

  }
  usersfunc()
}, [])

  const [name, setName] = useState("");
  const [returnedUsers, setReturnedUsers] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersSeries, setUsersSeries] = useState(["American History", "Spanish History", "French History"]);
  const [audioId, setAudioId] = useState(false);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [podcastData, setPodcastData] = useState({
    title: "",
    subject: "",
    schoolLevel: "",
    series: "",
    description: ""
  });
  const [errors, setErrors] = useState({
    noTitle: "",
    shortTitle: "",
    noSubject: "",
    noLevel: "",
    noSeries: "",
    noParticipants: "",
    shortDescription: "",
    noAudio: ""
  });

  const primaryAPI = "primaryAPI";






  // const [subject, setSubject] = useState()
  // const [schoolLevel, setSchoolLevel] = useState()


  useEffect(() => {
    let currentName = name;
    setTimeout(async () => {
      if (name.length === 0) {
        setReturnedUsers([]);
      } else if (name === currentName && name.length) {
        console.log("doing api")

        API.post(primaryAPI, "/searchUsersByName", {body: {name}}).then(res=> console.log("result: ", res.Users));
        // axios({
        //   method: "POST",
        //   url: "/search_participants_names",
        //   data: {
        //     name 
        //   }
        // }).then((res) => {
        //   console.log("RETURNED USERS", res)
        //   setReturnedUsers(res.data.userArray)
        // })
      }
    }, [300]);
  }, [name]);



    // specify upload params and url for your files
    // const getUploadParams = ({ file, meta }) => { 
    //   // return { url: "/upload-audio" }
    //   return { url: "https://ebmuby5pqa.execute-api.us-east-1.amazonaws.com/dev/upload-audio" }
    //  }
     
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file, xhr }, status) => {
      if (status === "removed") {
        // remove audio from S3
        setAudioId(null);
      } else {
        setErrors({
          ...errors,
          noAudio: false
        });
        if(status === "done") { 
          // var json = JSON.parse(xhr.response)
          // if (json.Key) {
          //   setAudioID(json.Key)
          // } 
        // setChange(!change)
        }
      }
    }

    // const makeSqlCalls = (allFiles) => {
    //   axios({
    //     method: "POST",
    //     url: "/audio_sql",
    //     data: {
    //       audioId,
    //       ...podcastData,
    //       selectedUsers
    //     }
    //   })
    //   console.log(allFiles)
    //   if (allFiles) {
    //     allFiles.forEach(f => f.remove());
    //   }
    // }

    const handleSubmit = async (files, allFiles) => {
      let errorPresent = false;
      const formErrors = {
        noTitle: null,
        shortTitle: null,
        noSubject: null,
        noLevel: null,
        noSeries: null,
        noParticipants: null
      }
      // if (podcastData.title.length < 1) {
      //   formErrors.noTitle = true;
      //   errorPresent = true;
      // } else if (podcastData.title.length < 3) {
      //   formErrors.shortTitle = true;
      //   errorPresent = true;
      // }
      // if (!podcastData.subject) {
      //   formErrors.noSubject = true;
      //   errorPresent = true;
      // }
      // if (!podcastData.schoolLevel) {
      //   formErrors.noLevel = true;
      //   errorPresent = true;
      // }
      // if (!podcastData.series) {
      //   formErrors.noSeries = true;
      //   errorPresent = true;
      // }
      // if (selectedUsers.length < 1) {
      //   formErrors.noParticipants = true;
      //   errorPresent = true;
      // }
      // if (podcastData.description) {
      //   if (podcastData.description.length<5) {
      //     formErrors.shortDescription = true;
      //     errorPresent = true;
      //   }
      // } else {
      //   formErrors.shortDescription = true;
      //   errorPresent = true;
      // }
      // if (!audioId) {
      //   formErrors.noAudio = true;
      //   errorPresent = true;
      // }
      if (errorPresent) {
        setErrors(formErrors)
        return
      } 

        // UPLOAD AUDIO AND MAKE SQL ENTRIES
        // setLoader(true);
        const audioId = `${uuidv4()}.mp3`;
        let returnedId = await Storage.put(audioId ,files[0].file);
        // setLoader(false);

        // call lambda function with ID to create SQL entries
        // CREATE AUDIO ENTRY
        const uploadData = {
          body: {...podcastData, selectedUsers, audioId}, 
          headers: {} // OPTIONAL
        };
        API.post(primaryAPI, "/upload", uploadData).then(res=> console.log("res", res));

        // CREATE AUDIOSUSERS ENTRY
        // need to query user pool before, then map through users to make entries
        // axios({
        //   method: "POST",
        //   url: "/audio_sql",
        //   data: {
        //     audioId,
        //     ...podcastData, 
        //     selectedUsers
        //   }
        // }).then((res) => {
        //   console.log(res)
        //   setPodcastData({title: "", description: ""});
        //   setSelectedUsers([]);
        //   setName("");
        //   setLoader(false);
        //   setSuccess(true);
        // })
        // file uploaded successfully to S3, now create SQL entries
        // makeSqlCalls(allFiles)
    }

    const handleAddClick = (user) => {
        setErrors({
          ...errors,
          noParticipants: false
        })
      let userAlreadyInArray = selectedUsers.find(element => element.userId == user.userId);
      if (!userAlreadyInArray) {
        setSelectedUsers([...selectedUsers, user])
      }
    }
    
    const handleRemoveClick = (user) => {
      let newArray = selectedUsers.filter((element, index, arr) => {
        return element.userId !== user.userId
      })
        setSelectedUsers(newArray)
    }
    
    const handleNameChange = (e) => {
      setName(e.target.value)
    }
    const handleTitleChange = (e) => {
      let title = e.target.value;
      if (errors.noTitle && title ) setErrors({...errors, noTitle: false});
      if (errors.shortTitle && title )setErrors({...errors,shortTitle: false});
      setPodcastData({...podcastData, title});
    }
    const handleSubjectChange = (e) => {
      let subject = e.target.value;
      if (errors.noSubject && subject )setErrors({...errors,noSubject: false});
      setPodcastData({...podcastData, subject});
    }


    const handleLevelChange = (e) => {
      let schoolLevel = e.target.value
      // if value, remove error
      if (errors.noLevel && schoolLevel) setErrors({...errors, noLevel: false});
      setPodcastData({...podcastData, schoolLevel})
    }
    const handleSeriesChange = (e) => {
      let series = e.target.value;
      // if value, remove error
      if (errors.noSeries && series) setErrors({...errors, noSeries: false});
      setPodcastData({...podcastData, series});
    }

    const handleDescriptionChange = (e) => {
      let description = e.target.value;
      // if value, remove error
      if (errors.shortDescription && description) setErrors({...errors, shortDescription: false});
      if (description.length <= 250) setPodcastData({...podcastData, description});
    }


    const displaySelectedUsers = () => {
      if (selectedUsers.length) {
       return selectedUsers.map((user) => {
         const fullName = user.firstName + " " + user.lastName
          return (
          <div className="users-container" key={user.firstName}>
            <Button variant="text" className="user" id={user.userId} onClick={() => handleRemoveClick(user)}>{fullName}</Button>
          </div>
          )
        })
      }
    }

    const displayUsers =() => {
      let returnValue;
      if (returnedUsers) {
       returnValue = returnedUsers.map((user) => {
        const fullName = user.firstName + " " + user.lastName
        return (
        <div className="users-container" key={user.firstName}>
          <Button variant="text" className="user" onClick={() => handleAddClick(user)}>{fullName}</Button>
        </div>
        )
        })
        
      } else {
        return <div></div>
      }
      return returnValue
      // return (
      //   <div className="users-container">
      //     <Button variant="text" className="user">Ryan Wilhelm</Button>
      //     <div className="user">Amanda</div>
      //   </div>
      // )
    }


  return (
    <div className='upload-container'>
      <div className="page-heading">Mi Estudio</div>
      <div className="error">{errors.noAudio ? "* audio file required" : ""}</div>
      {/* <ReactAudioPlayer
        src={audio}
        // src={"/audio_file"}
        autoPlay
        controls
      /> */}
      {success ?         
        <div className="success">
            <IconButton className='icon-button' onClick={() => setSuccess(false)} size="small">
              <CloseIcon className="close-icon" size="small"></CloseIcon>
            </IconButton>
            <div className="success-text">Congratulations! Your podcast has been uploaded!</div>
            <a className="link-text" href="https://example.com">Take a look!</a>
        </div> 
      : null}

        <div className="flex-container">
          
          <form className="upload-form">
              <h3>
                Podcast Details
              </h3>
              <div className="error">{errors.noTitle ? "* Title Required" : ""}</div>
              <div className="error">{errors.shortTitle ? "* Title too short - min. 3 characters" : ""}</div>
              <TextField id="podcast-title" label="Title" variant="standard" value={podcastData.title} onChange={handleTitleChange}/>
              <div style={{marginTop: "12px"}}>
              <div className='selects-holder'>
                <div className="select-container">
                <div className="error">{errors.noSubject ? "* Subject Required" : ""}</div>
                  <FormControl variant="standard" className="select-container">
                  <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={podcastData.subject}
                      label="Ageee"
                      className='select'
                      onChange={handleSubjectChange}
                    >
                      <MenuItem value={''}>-</MenuItem>
                      <MenuItem value={"Science"}>Science</MenuItem>
                      <MenuItem value={"Social Studies"}>Social Studies</MenuItem>
                      <MenuItem value={"Languages"}>Languages</MenuItem>
                      <MenuItem value={"Current Events"}>Current Events</MenuItem>
                    </Select>
                    </FormControl>
                    </div>
                    <div className="select-container">

                    <FormControl variant="standard" className="select-container">
                    <div className="error">{errors.noLevel ? "* Level Required" : ""}</div>
                    <InputLabel id="school-label">School Level</InputLabel>
                    <Select
                      labelId="school-label"
                      id="school-label"
                      value={podcastData.schoolLevel}
                      label="Grade"
                      className='select'
                      onChange={handleLevelChange}
                    >
                      <MenuItem value={''}>-</MenuItem>
                      <MenuItem value={"Elementary"}>Elementary</MenuItem>
                      <MenuItem value={"Middle School"}>Middle School</MenuItem>
                      <MenuItem value={"High School"}>High School</MenuItem>
                      <MenuItem value={"College"}>College</MenuItem>
                    </Select>
                  </FormControl>
                  </div>
                  <div className="select-container">
                    <FormControl variant="standard" >
                    <div className="error">{errors.noTitle ? "* Series Required" : ""}</div>
                      <InputLabel id="school-label">Podcast Series</InputLabel>
                      <Select
                        labelId="school-label"
                        id="school-label"
                        value={podcastData.series}
                        label="Grade"
                        className='select'
                        onChange={handleSeriesChange}
                      >
                        <MenuItem value={''}>-</MenuItem>
                        <MenuItem value={false}>No Series</MenuItem>
                        <MenuItem value={"New"}>Create New Series</MenuItem>
                        {usersSeries.map((series) => {
                          return <MenuItem value={series} key={series}>{series}</MenuItem>
                        })}
                      </Select>
                    </FormControl>

                  </div>
              </div>
              </div>

          </form>
          <div className='participants-container'>
                <div>
                  <h3>
                    Add Participants
                  </h3>
                  <TextField varient="outlined" label="Participant Name" value={name} onChange={(e) => handleNameChange(e)}/>
                  <div>
                  {displayUsers()}
                  </div>
                </div>
                <div className='participants'>
                  <h3>
                    Participants
                  </h3>
                  <div className="error">{errors.noParticipants ? "* Minimum 1 participant" : ""}</div>
                  {displaySelectedUsers()}
                </div>
              </div>
              
        </div>
        <div className="error desc-error">{errors.shortDescription ? "* min 5 characters" : ""}</div>
        <TextField
          id="outlined-multiline-static"
          className="description-input"
          label="Description (max 250 characters)"
          multiline
          rows={5}
          variant="outlined"
          value={podcastData.description}
          onChange={handleDescriptionChange}
          />
                {/* <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={() => handleSubmit()}
        accept="audio/*"
      /> */}
          <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={1}
      inputContent="Drag Files or Click to browse"
      submitButtonDisabled={files => files.length < 1}
    />
        <Modal 
          open={loader}
          onClose={() => setLoader(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
        <div><ReactLoading className="loader" type={"spin"} color={"#ffffff"} height={667} width={375} /></div>
        </Modal>


    </div>
  )
}

export default Upload