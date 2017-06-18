trigger BearAlertTopicAssignmentTrigger on TopicAssignment (after insert) {

  // Get FeedItem posts only
  Set<Id> feedIds = new Set<Id>();
  for (TopicAssignment ta : Trigger.new){
    if (ta.EntityId.getSObjectType().getDescribe().getName().equals('FeedItem')) {
      feedIds.add(ta.EntityId);
    }
  }

  // Load FeedItem bodies
  Map<Id,FeedItem> feedItems = new Map<Id,FeedItem>([SELECT Body FROM FeedItem WHERE Id IN :feedIds]);

  // Create messages for each FeedItem that contains the BearAlert topic
  List<String> messages = new List<String>();
  for (TopicAssignment ta : [SELECT Id, EntityId, Topic.Name FROM TopicAssignment
      WHERE Id IN :Trigger.new AND Topic.Name = 'BearAlert']) {
    messages.add(feedItems.get(ta.EntityId).body.stripHtmlTags().abbreviate(255));
  }

  // Publish messages as notifications
  NotificationController.publishNotifications(messages);
}