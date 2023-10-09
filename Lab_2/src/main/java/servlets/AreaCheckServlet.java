package servlets;

import data.UserRequestData;
import data.UserSessionBean;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import util.AreaValidator;
import util.InputValidator;

import java.io.IOException;

@WebServlet(name = "areaCheckServlet", urlPatterns = "/WEB-INF/checker")
@MultipartConfig
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        double x;
        double y;
        double r;

        try {
            x = Double.parseDouble(req.getParameter("x"));
            y = Double.parseDouble(req.getParameter("y"));
            r = Double.parseDouble(req.getParameter("r"));
            int clicked = Integer.parseInt(req.getParameter("clicked"));

            UserRequestData requestData = new UserRequestData(x, y, r, clicked);

            if (!InputValidator.validateInput(requestData)) throw new NumberFormatException();
            requestData.setClicked(clicked);

            generateResponsePage(requestData, req, resp);
        }
        catch (NumberFormatException e) {
            req.getSession().setAttribute("errorMsg", "400 Bad Request");
            resp.sendRedirect(req.getContextPath() + "/error");
        }
    }

    private void generateResponsePage(UserRequestData requestData, HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        boolean checkResult = AreaValidator.checkArea(requestData);

        requestData.setCheckResult(checkResult);
        requestData.setRequestTime((String) req.getAttribute("reqTime"));
        long requestStarted = (Long) req.getAttribute("reqStart");

        requestData.setExecutionTime(String.valueOf(System.currentTimeMillis() - requestStarted));

        UserSessionBean sessionBean = (UserSessionBean) req.getSession().getAttribute("sessionBean");
        if (sessionBean == null) {
            sessionBean = new UserSessionBean();
            req.getSession().setAttribute("sessionBean", sessionBean);
        }
        sessionBean.addNewResult(requestData);

        resp.sendRedirect(req.getContextPath() + "/result");
    }
}