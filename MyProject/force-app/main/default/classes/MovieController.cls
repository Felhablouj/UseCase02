public with sharing class MovieController {
    @AuraEnabled(cacheable=true)
    public static List<Movie__c> getNameMovie() {
            return[
          SELECT Name__c,category__c,description__c
          FROM Movie__c
           WITH SECURITY_ENFORCED
           ORDER BY Name
       ];
    }
}
