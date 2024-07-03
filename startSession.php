<?php
session_start();
session_destroy();
// Initialize the score if it's not already set in the session
if (!isset($_SESSION['score'])) {
    $_SESSION['score'] = 0;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  
    echo $_SESSION['score'];
 
} else {
    echo "Invalid request method.";
}
?>
