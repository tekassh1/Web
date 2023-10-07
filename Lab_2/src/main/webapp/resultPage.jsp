<%@ page import="data.UserSessionBean" %>
<%@ page import="data.UserRequestData" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
  UserSessionBean sessionBean = (UserSessionBean) session.getAttribute("sessionBean");
  List<UserRequestData> list = sessionBean.getRecentRequests();
%>

<!DOCTYPE html>
<html lang="en" style="height: 100%; width: 100%">

<head>
  <title>Web First</title>
  <link rel="icon" type="image/x-icon" href="resources/images/favicon.svg">
  <link rel="stylesheet" type="text/css" href="styles/mainPageStyle.css">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
</head>

<body>
<div class="wrapper">
  <header class="header">
    <h2 class="label">LAB 2</h2>
    <img src="resources/images/main.svg" id="logo" class="logo" alt="userIcon">
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

  <%= list.get(0).getX() %>
  <%= list.get(0).getY() %>
  <%= list.get(0).getR() %>

<%--  <c:if test="${empty sessionBean}">--%>
<%--    session bean is empty!!!--%>
<%--  </c:if>--%>
<%--    <c:forEach items="${list}" var="element">--%>
<%--      <c:if test="${empty element}">--%>
<%--          element is empty!!--%>
<%--        </c:if>--%>

<%--      ${element.y} <br>--%>
<%--      ${element.r} <br>--%>
<%--      ${element.requestTime} <br>--%>
<%--      ${element.executionTime} <br>--%>
<%--      ${element.checkResult} <br>--%>
    </c:forEach>
  </div>

  <footer>
    &copy; Goovnocode inc. 2023
    <br>
    <a href="https://github.com/tekassh1" target="_blank">
      <img src="resources/images/github2.svg" class="github" alt="githubLogo">
    </a>
  </footer>

</div>
<script src="scripts/headerController.js"></script>

</body>

</html>