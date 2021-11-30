import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router';

export const PollAnnouncement=(props)=>{
    // console.log(props.user);
    const navigate=useNavigate();
    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {props.Announcement}
                    </Typography>
                </CardContent>
                {props.user!=null && props.user.admin==false &&
                    <CardActions>
                        <Button size="small" onClick={()=>{navigate('/applyForPoll/'+props.pollAnnouncementId)}}>
                            Apply
                        </Button>
                    </CardActions>
                }
                
            </Card>
            <br/>
        </div>
        
    );
}