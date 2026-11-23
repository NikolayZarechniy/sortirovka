<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/items">
        <html>
            <head>
                <style>
                    table { border-collapse: collapse; width: 50%; font-family: sans-serif; }
                    th, td { border: 1px solid black; padding: 8px; text-align: left; }
                    .header-main { text-align: center; font-weight: bold; font-size: 1.2em; }
                    .gray { background-color: #d3d3d3; }
                </style>
            </head>
            <body>
                <table>
                    <tr>
                        <td colspan="2" class="header-main">
                            Всего элементов: <xsl:value-of select="count(element)"/>
                        </td>
                    </tr>
                    <tr>
                        <th style="text-align: center;">Тип</th>
                        <th style="text-align: center;">Наименование</th>
                    </tr>
                    <xsl:for-each select="element">
                        <tr>
                            <xsl:if test="position() mod 2 = 0">
                                <xsl:attribute name="class">gray</xsl:attribute>
                            </xsl:if>
                            
                            <td><xsl:value-of select="@name"/></td>
                            <td><xsl:value-of select="@value"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>