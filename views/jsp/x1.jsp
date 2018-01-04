<jsp:include page="child.jsp">ss</jsp:include>
<c:if test="${5>3&&list1!=null}">
    <p>看到我就说明5》3了</p>
</c:if>
<c:forEach items="${list1}" var="item">
    <li>
        <p>文字开始</p>
        <c:forEach items="${item.a}" var="li">
            <span> 很多文字,${li}</span>
        </c:forEach>
    </li>
</c:forEach>


