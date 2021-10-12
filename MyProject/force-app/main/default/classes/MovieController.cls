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
    @AuraEnabled(cacheable=true)
    public static List<Movie__c> getMoviesByFilter(String key){
        String searchString = '%'+key+'%';
        return[
          SELECT Name__c,category__c,description__c
          FROM Movie__c
          WHERE Name__c LIKE :searchString
          WITH SECURITY_ENFORCED
          ORDER BY Name__c
       ];
    }

}
