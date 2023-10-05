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
        System.out.println(ControllerServlet.class.getName());
        if (req.getParameter("x") == null || req.getParameter("y") == null || req.getParameter("r") == null)
            req.getServletContext().getRequestDispatcher("/WEB-INF/checker").forward(req, resp);
        else
            req.getServletContext().getRequestDispatcher("").forward(req, resp);
    }
}