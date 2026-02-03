using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("m_ca_analyses")] 
public class Analysis
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")]
    public long Id { get; set; } 

    [Required]
    [MaxLength(100)] 
    [Column("created_by")]
    public string CreatedBy { get; set; } = "System";

    [Column("created_on")]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

    [Required]
    [MaxLength(100)]
    [Column("last_updated_by")]
    public string LastUpdatedBy { get; set; } = "System";

    [Column("last_updated_on")]
    public DateTime? LastUpdatedOn { get; set; } = DateTime.UtcNow;

    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    [Column("code")]
    public string? Code { get; set; }

    [Column("description")]
    public string? Description { get; set; }

    [Column("parameter_id")]
    public long ParameterId { get; set; }

    [Column("method_id")]
    public long MethodId { get; set; }

    [Column("sample_type_id")]
    public long SampleTypeId { get; set; }

    [Column("lead_time")]
    public DateTime LeadTime { get; set; }

    [ForeignKey("ParameterId")]
    public virtual Parameter Parameter { get; set; }

    [ForeignKey("MethodId")]
    public virtual Method Method { get; set; }

    [ForeignKey("SampleTypeId")]
    public virtual SampleType SampleType { get; set; }
}