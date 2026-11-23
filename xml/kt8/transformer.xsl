<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="utf-8" indent="yes"/>

    <xsl:key name="cities" match="item" use="@city"/>
    
    <xsl:key name="orgs" match="item" use="concat(@city, '|', @org)"/>

    <xsl:template match="/orgs">
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                <title>Города</title>
            </head>
            <body>
                <h1>Города и компании</h1>
                <ul>
                    <xsl:for-each select="item[generate-id() = generate-id(key('cities', @city)[1])]">
                        <xsl:variable name="currentCity" select="@city"/>
                        <li>
                            <h3><xsl:value-of select="$currentCity"/></h3>
                            <p>Всего товаров: <xsl:value-of select="count(/orgs/item[@city = $currentCity])"/></p>
                            
                            <xsl:for-each select="/orgs/item[@city = $currentCity][generate-id() = generate-id(key('orgs', concat(@city, '|', @org))[1])]">
                                <xsl:variable name="currentOrg" select="@org"/>
                                <ul>
                                    <li>
                                        <h4><xsl:value-of select="$currentOrg"/></h4>
                                        <p>Всего товаров: <xsl:value-of select="count(/orgs/item[@city = $currentCity and @org = $currentOrg])"/></p>
                                        
                                        <ul>
                                            <xsl:for-each select="/orgs/item[@city = $currentCity and @org = $currentOrg]">
                                                <li>
                                                    <xsl:choose>
                                                        <xsl:when test="@title = 'Футболка'">Футблока</xsl:when>
                                                        <xsl:when test="@title = 'Велисапед'">Велосипед</xsl:when>
                                                        <xsl:when test="@title = 'Шапка'">Кепка</xsl:when>
                                                        <xsl:when test="@title = 'Трусы'">Футблока</xsl:when>
                                                        <xsl:when test="@title = 'Самокат'">Кепка</xsl:when>
                                                        <xsl:when test="@title = 'Шорты'">Футблока</xsl:when>
                                                        <xsl:otherwise><xsl:value-of select="@title"/></xsl:otherwise>
                                                    </xsl:choose>
                                                </li>
                                            </xsl:for-each>
                                        </ul>
                                    </li>
                                </ul>
                            </xsl:for-each>
                            
                        </li>
                    </xsl:for-each>
                </ul>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>