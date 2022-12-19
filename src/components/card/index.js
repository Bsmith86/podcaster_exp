import React, { useState, useRef, useEffect, useContext } from 'react'
import { styled } from '@mui/material/styles';

import {Card as MuiCard} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

import podcastImage from '../../assets/podcast-icon.jpg'

// import { UserContext } from '../../contexts'
import './index.css'

// const Card = ({data}) => {
    const Card = () => {

    // console.log(data)
    const data = {
        title: "Podcast Title",
        podcastId: 232323

    }
    const [expanded, setExpanded] = useState(false);
    const [expandedCSS, setExpandedCSS] = useState(false)
    // const [participants, setParticipants] = useState("Participants")
    const [userObjects, setUserObjects] = useState([])
    // const [numberOfParticipants, setNumberOfParticipants] = useState(null)

    

    const handleExpandClick = () => {
      setExpanded(!expanded);
      expanded ? setTimeout(() => {
          setExpandedCSS(false)
      }, (500)) 
      : setExpandedCSS(true)
    };

    useEffect(() => {
        console.log(userObjects)
    }, [userObjects])



    const getUserData = (id) => {
        axios({
            method: "POST",
            url: "get_user_info",
            data: {
                id
            }
        }).then((res) => {
            console.log(res)
            setUserObjects(res.data)
        let string = "";
        

        })
    }

    // useEffect(() => {
    //     console.log(data.podcastId)
    //     axios({
    //         method: "POST",
    //         url: "get_participants",
    //         data: {
    //             id: data.podcastId
    //         }
    //     }).then((res) => {
    //         console.log("participants res: ", res)
    //         setNumberOfParticipants(res.data.length)
    //         res.data.forEach((user) => {
    //             getUserData(user.userId)
    //         })
    //     })
    // }, [])

    // .then((res) => {
    //     console.log(res)
    //     if (res.data.length) {
  
    // })
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

  return (
    <div className='placeholder-box'>
        <MuiCard sx={{ maxWidth: 345 }} className={`individual-card ${expanded ? 'expanded' : null} ${expandedCSS ? 'z-index-5' : null}`}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={data.title}
                subheader={data.date}
                className='header-1'
            />
            <div className="participant-container">
                {data.users.map((user) => {
                    let name = user.firstName + " " + user.lastName;
                return   <CardHeader
                    subheader={name}
                    className='header-2'
                    />
                })}
            </div>

 
            <CardMedia
                component="img"
                height="194"
                src={podcastImage}
                alt="Podcast-image"
                className={`card-image ${expanded ? 'expanded-img' : null}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {data.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
                {/* <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore> */}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                    aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                    stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and
                    peppers, and cook without stirring, until most of the liquid is absorbed,
                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                    mussels, tucking them down into the rice, and cook again without
                    stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
                </CardContent>
            </Collapse>
        </MuiCard>
    </div>
    
  )
}

export default Card