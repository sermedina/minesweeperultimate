package com.deviget.minesweeperultimate.utils;

import java.util.Locale;
import java.util.ResourceBundle;
import java.util.Set;
import org.springframework.context.support.ResourceBundleMessageSource;

/**
 *
 * @author smedina
 */
public class ExposedResourceBundleMessageSource extends ResourceBundleMessageSource{
    
    public Set<String> getKeys(String basename, Locale locale) {
        ResourceBundle bundle = getResourceBundle(basename, locale);
        return bundle.keySet();
    }
    
}
