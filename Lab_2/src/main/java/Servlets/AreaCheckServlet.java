package Servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "areaCheckServlet", urlPatterns = "/WEB-INF/checker")
@MultipartConfig
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        double xVal = Double.parseDouble(req.getParameter("xChoosing"));
        double yVal = Double.parseDouble(req.getParameter("yChoosing"));
        double rVal = Double.parseDouble(req.getParameter("rChoosing"));

        System.out.println(xVal);
        System.out.println(yVal);
        System.out.println(rVal);
    }

    private boolean checkArea() {
        return true;
    }
}