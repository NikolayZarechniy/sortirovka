<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text" encoding="UTF-8"/>

    <xsl:template match="/">
        <xsl:variable name="lessons" select="timeTable/lessons/lesson"/>
        
        <xsl:text>Комплекс Курская: всего занятий </xsl:text>
        <xsl:value-of select="count($lessons[@complex='КУ'])"/>
        <xsl:text>&#10;</xsl:text>

        <xsl:text>Комплекс ВДНХ: всего занятий </xsl:text>
        <xsl:value-of select="count($lessons[@complex='ВТ'])"/>
        <xsl:text>&#10;</xsl:text>

        <xsl:text>Занятий в 10:00: </xsl:text>
        <xsl:value-of select="count($lessons[time='10:00'])"/>
        <xsl:text>&#10;</xsl:text>

        <xsl:text>Занятий в 15:30: </xsl:text>
        <xsl:value-of select="count($lessons[time='15:30'])"/>
        <xsl:text>&#10;</xsl:text>

        <xsl:text>Занятий в 17:20: </xsl:text>
        <xsl:value-of select="count($lessons[time='17:20'])"/>
        <xsl:text>&#10;</xsl:text>

        <xsl:variable name="first" select="$lessons[1]"/>
        <xsl:text>Первое занятие: </xsl:text>
        <xsl:value-of select="$first/thema"/>
        <xsl:text> состоялось </xsl:text>
        <xsl:value-of select="$first/date"/>
        <xsl:text>&#10;</xsl:text>

        <xsl:variable name="last" select="$lessons[last()]"/>
        <xsl:text>Последнее занятие: </xsl:text>
        <xsl:value-of select="$last/thema"/>
        <xsl:text> состоялось </xsl:text>
        <xsl:value-of select="$last/date"/>
        <xsl:text>&#10;</xsl:text>

        <xsl:text>Занятий по DTD: </xsl:text>
        <xsl:value-of select="count($lessons[contains(thema, 'DTD')])"/>
        <xsl:text>&#10;</xsl:text>

        <xsl:text>Чётных занятий на Курской: </xsl:text>
        <xsl:value-of select="count($lessons[@complex='КУ' and (@no mod 2 = 0)])"/>
        <xsl:text>&#10;</xsl:text>

        <xsl:text>Нечётных занятий на ВДНХ: </xsl:text>
        <xsl:value-of select="count($lessons[@complex='ВТ' and (@no mod 2 != 0)])"/>
    </xsl:template>
</xsl:stylesheet>