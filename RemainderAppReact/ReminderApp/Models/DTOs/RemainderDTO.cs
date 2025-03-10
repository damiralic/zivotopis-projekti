namespace ReminderApp.Models.DTOs
{
    public class RemainderDTO
    {
        public string? Name { get; set; }
        public bool? isCompleted { get; set; }
        public DateOnly? StartDateTime { get; set; }
    }
}
