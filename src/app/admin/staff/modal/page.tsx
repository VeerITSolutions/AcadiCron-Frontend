"use client"; // Add this at the top of the file
import { useState, useContext } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon

// Assuming you have a ThemeContext that provides the current theme (e.g., 'black' or 'white')
/* import { ThemeContext } from "@/context/ThemeContext"; */

// Example of theme styles based on 'black' or 'white' mode
const themeStyles = {
  dark: {
    backgroundColor: "black",
    borderColor: "white",
    textColor: "white",
    iconColor: "white",
  },
  light: {
    backgroundColor: "white",
    borderColor: "black",
    textColor: "black",
    iconColor: "black",
  },
};

const staffidcard = () => {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // State to manage modal open/close
  const router = useRouter();
  

  // Accessing theme from context (this could be 'black' or 'white')

  // Get the styles based on the current theme
  const styles = themeStyles["dark"];

  const handleOpen = () => setOpen(true); // Function to open modal
  const handleClose = () => setOpen(false); // Function to close modal

  return (
    <DefaultLayout>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Open modal
      </Button>
      <Modal
        open={open} // Use open state to show/hide the modal
        onClose={handleClose} // Close modal on click outside or escape
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: styles.backgroundColor, // Dynamic background color
            border: `2px solid ${styles.borderColor}`, // Dynamic border color
            boxShadow: 24,
            p: 4,
            color: styles.textColor, // Dynamic text color
          }}
        >
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: styles.iconColor, // Dynamic icon color
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </DefaultLayout>
  );
};

export default staffidcard;
