import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@mui/material';

export default function ManagementDialog({
  open,
  onClose,
  title,
  formData,
  onFormChange,
  onSubmit,
  fields,
  isMobile = false,
  customComponents = {}
}) {
  const handleCustomChange = (name, value) => {
    onFormChange({ target: { name, value } });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={isMobile}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {fields.map((field) => (
              <Grid item xs={12} key={field.name}>
                {field.type === 'select' ? (
                  <TextField
                    fullWidth
                    select
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={onFormChange}
                    SelectProps={{
                      native: true,
                    }}
                    size={isMobile ? "medium" : "small"}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                ) : field.customComponent ? (
                  customComponents[field.customComponent]({
                    value: formData[field.name],
                    onChange: (value) => handleCustomChange(field.name, value),
                    isMobile
                  })
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type || 'text'}
                    value={formData[field.name]}
                    onChange={onFormChange}
                    multiline={field.multiline}
                    rows={field.rows}
                    required={field.required}
                    inputProps={field.inputProps}
                    size={isMobile ? "medium" : "small"}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} size={isMobile ? "large" : "medium"}>
            ביטול
          </Button>
          <Button type="submit" variant="contained" size={isMobile ? "large" : "medium"}>
            {title.includes('ערוך') ? 'עדכן' : 'צור'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 