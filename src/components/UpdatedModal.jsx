import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { textContext } from '../App';

export default function ResponsiveDialog({id}) {
    const [open, setOpen] = React.useState(false);
    const [newText, setNewText] = React.useState('')
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const {text,setText} = React.useContext(textContext)
   
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewText = ()=>{
       let a = []
        for(let i=0; i<text.length; i++){
             if(text[i].id === id){
                a.push({text: newText,id:text[i].id})
             }
             else{
                a.push({text: text[i].text, id: text[i].id})
             }
        }
       
        setText(a)
        setOpen(false);
    }



    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                UPDATED
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                    <TextField
                        style={{width:'300px'}}                 
                        id="filled-size-small"               
                        variant="filled"
                        size="small"
                        placeholder='text'
                        onChange={(e)=>setNewText(e.target.value)}                
            />
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button onClick={handleNewText} autoFocus>
                        UPDATE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
