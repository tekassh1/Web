<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%--Disable caching for keeping JSP updated --%>
<%
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    response.setDateHeader("Expires", -1);
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

    <div class="controlPanel">
        <form id="mainForm">

            <fieldset style="display: inline-block; padding-top: 10px;" class="xSelectionPanel">
                Select<a class="colourfulText"> X </a>value<br>

                <input class="xButtons" type="radio" value="-2" id="m2X" name="xChoosing">
                <label class="xLabels" for="m2X">-2</label><br>

                <input class="xButtons" type="radio" value="-1.5" id="m15X" name="xChoosing">
                <label class="xLabels" for="m15X">-1.5</label><br>

                <input class="xButtons" type="radio" value="-1" id="m1X" name="xChoosing">
                <label class="xLabels" for="m1X">-1</label><br>

                <input class="xButtons" type="radio" value="-0.5" id="m05X" name="xChoosing">
                <label class="xLabels" for="m05X">-0.5</label><br>

                <input class="xButtons" type="radio" value="0" id="0X" name="xChoosing">
                <label class="xLabels" for="0X">0</label><br>

                <input class="xButtons" type="radio" value="0.5" id="05X" name="xChoosing">
                <label class="xLabels" for="05X">0.5</label><br>

                <input class="xButtons" type="radio" value="1" id="1X" name="xChoosing">
                <label class="xLabels" for="1X">1</label><br>

                <input class="xButtons" type="radio" value="1.5" id="15X" name="xChoosing">
                <label class="xLabels" for="15X">1.5</label><br>

                <input class="xButtons" type="radio" value="2" id="2X" name="xChoosing">
                <label class="xLabels" for="2X">2</label><br>
            </fieldset>

            <div class="ySelectionPanel">
                Enter <a class="colourfulText">Y</a> value
                <label style="box-sizing: border-box">
                    <br>
                    <input id="yField" type="text" style="height: 30px" name="yChoosing" maxlength="15">
                </label>
            </div>

            <fieldset style="border-width: 0;" class="rSelectionPanel">
                Select<a class="colourfulText"> R </a>value<br><br>
                <input class="rButtons" style="padding-left: 1.5%;" type="checkbox" name="rChoosing" value="1" id="r1">
                <label style="padding-right: 1.5%;" for="r1">1</label>

                <input class="rButtons" style="padding-left: 1.5%;" type="checkbox" name="rChoosing" value="2" id="r2">
                <label style="padding-right: 1.5%;" for="r2">2</label>

                <input class="rButtons" style="padding-left: 1.5%;" type="checkbox" name="rChoosing" value="3" id="r3">
                <label style="padding-right: 1.5%;" for="r3">3</label>

                <input class="rButtons" style="padding-left: 1.5%;" type="checkbox" name="rChoosing" value="4" id="r4">
                <label style="padding-right: 1.5%;" for="r4">4</label>

                <input class="rButtons" type="checkbox" name="rChoosing" value="5" id="r5">
                <label for="r5">5</label>
            </fieldset>

        </form>

        <div name="requestButtonsBlock">
            <h5 id="incorrectInputText">Wrong data!</h5>
            <button id="checkRequestButton">Check point</button>
            <br>
            <button id="resetRequestButton">Reset values</button>
        </div>

    </div>

    <div class="secondaryPanel">

        <svg id="coordinatePlane" viewBox="0 0 500 500">

            <!-- x axis -->
            <line x1="0" y1="250" x2="500" y2="250" stroke="black" stroke-width="1" stroke-linecap="square"></line>
            <!-- y axis -->
            <line x1="250" y1="0" x2="250" y2="500" stroke="black" stroke-width="1" stroke-linecap="square"></line>

            <!-- x axis markup-->
            <line x1="30" y1="245" x2="30" y2="255" stroke="black" stroke-width="1" stroke-linecap="square"></line>
            <line x1="140" y1="245" x2="140" y2="255" stroke="black" stroke-width="1" stroke-linecap="square"></line>
            <line x1="360" y1="245" x2="360" y2="255" stroke="black" stroke-width="1" stroke-linecap="square"></line>
            <line x1="470" y1="245" x2="470" y2="255" stroke="black" stroke-width="1" stroke-linecap="square"></line>

            <!-- y axis markup-->
            <line x1="245" y1="30" x2="255" y2="30" stroke="black" stroke-width="1" stroke-linecap="square"></line>
            <line x1="245" y1="140" x2="255" y2="140" stroke="black" stroke-width="1" stroke-linecap="square"></line>
            <line x1="245" y1="360" x2="255" y2="360" stroke="black" stroke-width="1" stroke-linecap="square"></line>
            <line x1="245" y1="470" x2="255" y2="470" stroke="black" stroke-width="1" stroke-linecap="square"></line>

            <!-- axes naming -->
            <text x="485" y="264">x</text>
            <text x="236" y="15">y</text>
            <text x="254" y="264">0</text>

            <!-- x markups naming -->
            <text class="mR" x="20" y="235">-R</text>
            <text class="mR2" x="125" y="235">-R/2</text>
            <text class="R2" x="353" y="235">R/2</text>
            <text class="R" x="465" y="235">R</text>

            <!-- y markups naming -->
            <text class="mR" x="260" y="473">-R</text>
            <text class="mR2" x="260" y="363">-R/2</text>
            <text class="R2" x="260" y="145">R/2</text>
            <text class="R" x="260" y="35">R</text>

            <!-- Figures -->
            <polygon points="250 250, 250 140, 30 250" fill="blue" opacity="0.2"></polygon>
            <rect x="250" y="140" width="220" height="110" fill="blue" opacity="0.2"></rect>
            <path d="M 250 250
               L 30 250
               A 220 220 0 0 0 250 470
               L 250 250"
                  fill="blue" opacity="0.2"></path>

            <rect id="clickArea" width="100%" height="100%">
            </rect>

            <%-- Clicked points --%>
            <c:forEach items="${sessionBean.recentRequests}" var="point">
                <c:if test="${point.clicked == '1'}">
                    <c:choose>
                        <c:when test="${point.checkResult == true}">
                            <%-- Transformation to html area coords --%>
                            <circle
                                    cx="${point.x * (220/point.r) + 250}"
                                    cy="${-(point.y * (220/point.r) - 250)}"
                                    r="5" fill="#72be00"></circle>
                        </c:when>
                        <c:otherwise>
                            <circle
                                    cx="${point.x * (220/point.r) + 250}"
                                    cy="${(point.y * (220/point.r) - 250) * (-1)}"
                                    r="5" fill="red"></circle>
                        </c:otherwise>
                    </c:choose>
                </c:if>
            </c:forEach>
        </svg>

        <div class="tableBlock">
            <label style="width: 100%; float:left; padding-top: 5px; color: #72be00">Recent results</label>
            <table>
                <tr>
                    <th style="width: 7%;">X</th>
                    <th style="width: 7%">Y</th>
                    <th style="width: 7%">R</th>
                    <th style="width: 9%">Result</th>
                    <th style="width: 30%">Request</th>
                    <th style="width: 30%">Execution time</th>
                </tr>

                <tbody id="mainTableBody">
                    <c:forEach items="${sessionBean.recentRequests}" var="request">
                        <tr>
                            <td>${request.x}</td>
                            <td>${request.y}</td>
                            <td>${request.r}</td>

                            <c:choose>
                                <c:when test="${request.checkResult == true}">
                                    <td>YES</td>
                                </c:when>
                                <c:otherwise>
                                    <td>NO</td>
                                </c:otherwise>
                            </c:choose>

                            <td>${request.requestTime}</td>
                            <td>${request.executionTime} ms</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>

        </div>
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
<script src="scripts/mainPageController.js"></script>

</body>

</html>