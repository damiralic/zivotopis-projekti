namespace ReminderApp.Models
{
    public class Remainder
    {
        public Guid Id { get; set; }
        public string? Name {  get; set; }
        public bool? isCompleted { get; set; }
        public DateOnly? StartDateTime { get; set; }
    }
}
