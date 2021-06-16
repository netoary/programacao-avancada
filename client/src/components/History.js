import React from 'react';
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    paper: {
        padding: '16px 16px',
      },
  });

class History extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                Detalhes
                </Typography>

                <Timeline align="alternate">
                {this.props.row.map((historyRow) => (
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography color="textSecondary">{historyRow.dateTime}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography>{historyRow.message}</Typography>

                            {(historyRow.documentId != null) ?
                                
                                <Typography variant="caption">
                                    <br/>
                                    Documento associado: {historyRow.documentId}
                                </Typography>
                                :
                                null
                                }
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                ))}
                </Timeline>
            </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(History);