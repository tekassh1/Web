package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@WebServlet(name = "controllerServlet", urlPatterns = "/controller")
@MultipartConfig
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long reqStart = System.currentTimeMillis();

        if (req.getParameter("x") == null || req.getParameter("y") == null || req.getParameter("r") == null) {
            req.getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
        else {
            String reqTime = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss")
                    .format(Calendar.getInstance().getTime());

            req.setAttribute("reqTime", reqTime);
            req.setAttribute("reqStart", reqStart);
            req.getServletContext().getRequestDispatcher("/WEB-INF/checker").forward(req, resp);
        }
    }
}