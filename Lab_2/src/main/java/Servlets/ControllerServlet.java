package Servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "controllerServlet", urlPatterns = "")
@MultipartConfig
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(req.getParameter("xChoosing"));
        System.out.println(req.getParameter("yChoosing"));
        System.out.println(req.getParameter("rChoosing"));

//        if (req.getParameter("x") == null || req.getParameter("y") == null || req.getParameter("r") == null)
//            req.getServletContext().getNamedDispatcher("controllerServlet").forward(req, resp);
//        else
//            req.getServletContext().getNamedDispatcher("areaCheckServlet").forward(req, resp);
    }
}