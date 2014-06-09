<?xml version="1.0" encoding="UTF-8" ?>
<p:pipeline version="1.0"
        xmlns:p="http://www.w3.org/ns/xproc"
        xmlns:c="http://www.w3.org/ns/xproc-step"
        xmlns:l="http://xproc.org/library">

<p:option name="vocab" required="true" /> 

<p:load> 
    <p:with-option name="href" select="concat('select-classes.rq?results&amp;vocab=&lt;',encode-for-uri($vocab)),'&gt;'" /> 
</p:load> 

<p:xslt name="classlist"> 
 <p:input port="stylesheet">
            <p:inline>
                <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                    xmlns:sp="http://www.w3.org/2005/sparql-results#"
                    xmlns="http://www.w3.org/1999/xhtml"
                    version="2.0"
                    exclude-result-prefixes="sp xsl c l">
                    <xsl:output method="xml" indent="yes" encoding="UTF-8" />

                <xsl:strip-space elements="*"/>
                
                <xsl:template match="sp:sparql">
                    <select>
                        <xsl:apply-templates/>
                    </select>
              </xsl:template>
            
                <xsl:template match="sp:result">
                    <option>
                    <xsl:attribute name="id">
                        <xsl:value-of select="sp:binding[@name='class']"/>
                    </xsl:attribute>
                    <xsl:value-of select="sp:binding[@name='class']"/></option>
                </xsl:template>   
   
</xsl:stylesheet>
</p:inline>
</p:input>
</p:xslt>

</p:pipeline>