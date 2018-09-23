module ApplicationHelper
  def format_posted_time(time)
    config.time_zone = 'Tokyo'
    Time::DATE_FORMATS[:default] = '%Y/%m/%d %H:%M'
    time.to_s(:default)
  end
end
