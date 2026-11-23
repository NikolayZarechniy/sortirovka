<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:output method="text" encoding="UTF-8"/>
    
    <xsl:template match="/sum-of-sequence">
        <xsl:call-template name="sum-sequence">
            <xsl:with-param name="current" select="number(from)"/>
            <xsl:with-param name="end" select="number(to)"/>
            <xsl:with-param name="accumulator" select="0"/>
        </xsl:call-template>
    </xsl:template>
    
    <xsl:template name="sum-sequence">
        <xsl:param name="current"/>
        <xsl:param name="end"/>
        <xsl:param name="accumulator"/>
        
        <xsl:choose>
            <xsl:when test="$current > $end">
                <xsl:value-of select="$accumulator"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="sum-sequence">
                    <xsl:with-param name="current" select="$current + 1"/>
                    <xsl:with-param name="end" select="$end"/>
                    <xsl:with-param name="accumulator" select="$accumulator + $current"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

</xsl:stylesheet>