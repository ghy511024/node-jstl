
<%--
node 后台传输数据
 data = {
     num1: "1",
     list1: [
           {a: [1, true, 3, false, 5]},
           {a: [{"x": "dd"}, [1, 2, 3]]},
       }
--%>
<jsp:include page="x2.jsp"></jsp:include>
<c:if test="${5>3&&list1!=null||num1=='1'}">
    <P>if 语句生效了333</P>
</c:if>
<c:forEach items="${list1}" var="item">
    <li>
        <p>外层循环</p>
        <c:forEach items="${item.a}" var="li">
            <span> 内层循环,${li}</span>
        </c:forEach>
    </li>
</c:forEach>


