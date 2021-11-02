import React, { useState } from "react";
import { useHistory } from "react-router";
import MainContainer from "./MainContainer";
import Typography from "@material-ui/core/Typography";
import { useData } from "../DataContext";
import { Button, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Link } from "react-router-dom";
import { InsertDriveFile } from "@material-ui/icons";
import PrimaryButton from "./PrimaryButton";
import Swal from "sweetalert2";
import Confetti from "react-confetti";

const useStyles = makeStyles({
    root: {
        marginBottom: '30px',
    },
    table: {
        marginBottom: '30px',
    }
})


const Result = () => {
    const [success, setSuccess] = useState(false);
    const styles = useStyles();
    const { data, setValues } = useData();
    const entries = Object.entries(data).filter((entry) => entry[0] !== 'files');
    const { files } = data;
    const history = useHistory();

    // const onSubmit = async() => {
    //     const formData = new FormData();
    
    //     if(data.files) {
    //         data.files.forEach(file => {
    //             formData.append('files', file, file.name);
    //         })
    //     }

    //     entries.forEach(entry => {
    //         formData.append(entry[0], entry[1], )
    //     })

    //     const res = await fetch('http://localhost:4000/', {
    //         method: 'POST',
    //         body: formData,
    //     })

    //     if (res.status === 200) {
    //         Swal.fire('Great job', 'You have passed challendge!', 'success');
    //         setSuccess(true);
    //     }
    // }

    function onSubmit() {
        setSuccess(true);
        Swal.fire('Great job', 'You have passed challendge!', 'success');
    }

    const restartHandler = () => {
        setValues({}, true);
        history.push('/');
    }

    if (success) {
        return (
            <MainContainer>
                <Confetti />
                <Button size='large' onClick={restartHandler}>
                    🤷‍♂️ Restart
                </Button>
            </MainContainer>
        )
    }
    
    return (
        <MainContainer>
            <Typography component='h2' variant='h5'>
                🎈 Form Values
            </Typography>
            <TableContainer className={styles.root} component={Paper}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Field
                            </TableCell>
                            <TableCell align='right'>
                                Value
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            entries.map((entry) => (
                                <TableRow key={entry[0]}>
                                    <TableCell>
                                        {entry[0]}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {String(entry[1])}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                files && files.length !== 0 && (
                    <>
                        <Typography component='h2' variant='h5'>
                            🥝 Files
                        </Typography>
                        <List>
                            {
                                files.map((f, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <InsertDriveFile />
                                        </ListItemIcon>
                                        <ListItemText primary={f.name} secondary={f.size} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </>
                )
            }
            <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
            <Link to='/'>Start over</Link>
        </MainContainer>
    )
}

export default Result;