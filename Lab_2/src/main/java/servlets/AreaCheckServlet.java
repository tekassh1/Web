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
import java.io.PrintWriter;

@WebServlet(name = "areaCheckServlet", urlPatterns = "/WEB-INF/checker")
@MultipartConfig
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        long reqStart = System.currentTimeMillis();

        double x;
        double y;
        double r;

        try {
            x = Double.parseDouble(req.getParameter("x"));
            y = Double.parseDouble(req.getParameter("y"));
            r = Double.parseDouble(req.getParameter("r"));

            UserRequestData requestData = new UserRequestData(x, y, r);
            requestData.setReqStartTime(reqStart);

            if (!InputValidator.validateValues(requestData)) throw new NumberFormatException();

            generateResponsePage(requestData, req, resp);
        }
        catch (NumberFormatException e) {
            PrintWriter writer = resp.getWriter();
            writer.write("Error ebaniy!");
            writer.close();
        }
    }

    private void generateResponsePage(UserRequestData requestData, HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        boolean checkResult = AreaValidator.checkArea(requestData);

        requestData.setCheckResult(checkResult);
        requestData.setRequestTime((String) req.getAttribute("reqTime"));
        requestData.setExecutionTime(String.valueOf(System.currentTimeMillis() - requestData.getReqStartTime()));

        UserSessionBean sessionBean = (UserSessionBean) req.getSession().getAttribute("sessionBean");
        if (sessionBean == null) {
            sessionBean = new UserSessionBean();
            req.getSession().setAttribute("sessionBean", sessionBean);
        }
        sessionBean.addNewResult(requestData);

        resp.sendRedirect(req.getContextPath() + "/resultPage.jsp");
    }
}