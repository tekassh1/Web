<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="en" style="height: 100%; width: 100%">

<head>
    <title>Web First</title>
    <link rel="icon" type="image/x-icon" href="resources/images/favicon.svg">
    <link rel="stylesheet" type="text/css" href="styles/errorPageStyle.css">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
</head>

<body>
<div class="wrapper">
    <header class="header">
        <h2 class="label">LAB 2</h2>

        <a href="${pageContext.request.contextPath}">
            <img src="resources/images/main.svg" id="logo" class="logo" alt="userIcon">
        </a>

        <button id="expandButton" class="expandAuthor">
            <img src="resources/images/arrow-down.svg" id="arrow" class="img" alt="expandAuthorIcon">
        </button>

        <div id="expanded" class="infoText">
            <p>Student:<a class="colourfulText"> Kuznetsov Daniil</a></p>
            <p>Group:<a class="colourfulText"> P3234</a></p>
            <p>Variant:<a class="colourfulText"> 3402</a></p>
            <br>
        </div>

    </header>

    <div id="mainBlock">
        <div id="errorBlock">
            <img src="resources/images/error.svg" id="errorImg" class="logo" alt="userIcon" width="150" height="150">
            <div id="errorMsgBlock">
                <b id="errorLabel">Error ${sessionScope.errorMsg}</b>
            </div>
        </div>
    </div>

    <footer>
        &copy; Goovnocode inc. 2023
        <br>

        <a href="https://github.com/tekassh1" target="_blank">
            <img src="resources/images/github2.svg" class="github" alt="githubLogo">
        </a>

    </footer>

    <script src="scripts/headerController.js"></script>
    <script src="scripts/resultPageController.js"></script>
</div>
</body>

</html>