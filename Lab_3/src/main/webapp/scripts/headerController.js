// Expand header animation
let expandButton = document.getElementById("expandButton");
expandButton.addEventListener("click", function () {

        let block = document.getElementById("expanded");
        let arrow = document.getElementById("arrow");

        if (block.style.maxHeight){
            block.style.maxHeight = null;
            arrow.src = "${pageContext.request.contextPath}/resources/images/arrow-down.svg";
        } else {
            arrow.src = "${pageContext.request.contextPath}/resources/images/arrow-up.svg";
            block.style.maxHeight = block.scrollHeight + "px";
        }
    }
);