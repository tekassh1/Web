<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="en" style="height: 100%; width: 100%">

<head>
  <title>Web First</title>
  <link rel="icon" type="image/x-icon" href="resources/images/favicon.svg">
  <link rel="stylesheet" type="text/css" href="styles/resultPageStyle.css">

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
    <div id="requestData">
      <label style="width: 100%; float:left; padding-top: 5px; color: #72be00">Result</label>
      <table>
        <br>
        <tr>
          <th style="width: 7%;">X</th>
          <th style="width: 7%">Y</th>
          <th style="width: 7%">R</th>
          <th style="width: 9%">Result</th>
          <th style="width: 30%">Request</th>
          <th style="width: 30%">Execution time</th>
        </tr>

        <c:set var="request" value="${sessionBean.recentRequests[0]}" />
        <tbody id="mainTableBody">
        <tr>
          <td>${request.x}</td>
          <td>${request.y}</td>
          <td>${request.r}</td>

          <c:choose>
            <c:when test="${request.checkResult == true}">
              <td id="resultTextCell">YES</td>
            </c:when>
            <c:otherwise>
              <td id="resultTextCell">NO</td>
            </c:otherwise>
          </c:choose>

          <td>${request.requestTime}</td>
          <td>${request.executionTime} ms</td>
        </tr>
        </tbody>
      </table>
    </div>

    <a href="${pageContext.request.contextPath}">
      <button id="goBackButton">Go back</button>
    </a>

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