<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/items">
        <goods>
            <xsl:comment> Всего элементов: <xsl:value-of select="count(element)"/> </xsl:comment>
            
            <xsl:for-each select="element">
                <xsl:element name="{@name}">
                    <xsl:value-of select="@value"/>
                </xsl:element>
            </xsl:for-each>
        </goods>
    </xsl:template>
</xsl:stylesheet>