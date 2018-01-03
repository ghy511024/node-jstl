    <html>
        <body>
        <ul>
        <c:forEach items="${list1}" var="item">
            <li>
            <p>文字开始</p>
            <c:forEach items="${item.a}" var="li">
                <span> 很多文字,${li}</span>
            </c:forEach>
            </li>
        </c:forEach>
        </ul>
        </body>
        </html>

