package com.deviget.minesweeperultimate.controller;

import com.deviget.minesweeperultimate.filter.CustomWebAuthenticationDetails;
import com.deviget.minesweeperultimate.utils.ExposedResourceBundleMessageSource;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author smedina
 */
@RestController
public class ResourcesController {



    @Autowired
    private ResourceBundleMessageSource resource;

    /*--------------------------------Resources by tables------------------------------------*/
    @RequestMapping(value = "/resourceList", method = RequestMethod.GET)
    public ResponseEntity<Map> getResourceList() {
        
        ExposedResourceBundleMessageSource messageSource = new ExposedResourceBundleMessageSource();
        Map resources = new HashMap();

        
        Set<String> keys = ((ExposedResourceBundleMessageSource) messageSource).getKeys("Resource", getLocale());
        for (String key : keys) {
            String[] parts = key.split("\\.");
            if (parts[0].equals("custom")) {
                resources = buildResourcesMap(resources, 1, parts, key, getLocale());
            }
        }

        if (resources.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(resources, HttpStatus.OK);
    }

    public Map buildResourcesMap(Map resourcesAux, int index, String[] parts, String key, Locale locale) {
        Map answer = resourcesAux;
        for (int i = 1; i < parts.length; i++) {
            if (i == parts.length - 1) {
                answer.put(parts[i], resource.getMessage(key, null, locale));
            } else {
                if (!answer.containsKey(parts[i])) {
                    answer.put(parts[i], new HashMap());
                }
                answer = (HashMap) answer.get(parts[i]);
            }
        }        
        return resourcesAux;
    }
    
    private Locale getLocale(){
		Locale locale= null;
		Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();

		if (details instanceof CustomWebAuthenticationDetails) {
			locale = ((CustomWebAuthenticationDetails)details).getLocale();
		} else {
			
		}
		return locale;
	}

}
