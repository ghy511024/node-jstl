<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="ghy/core" %>
<c:forEach items="list1" var="item">
    第一层循环
    <c:forEach items="item" var="it2">
        ${it2.xixi}-${it2.haha}
        第二层循环
        <c:if test="${a=1&&b!=2||c+3>0&&(d==false)}">
            我出来了
        </c:if>
    </c:forEach>
</c:forEach>
