

var formJsonUrl="changePassword.json";

			function collectFormData(fields) {
				var data = {};
				for (var i = 0; i < fields.length; i++) {
					var $item = $(fields[i]);
					data[$item.attr('name')] = $item.val();
				}
				return data;
			}
				
			$(document).ready(function() {
				var $form = $('#change-password-form');
				$form.bind('submit', function(e) {
					// Ajax validation
					var $inputs = $form.find('input');
					var data = collectFormData($inputs);
					
					$.post(formJsonUrl, data, function(response) {
						$form.find('.control-group').removeClass('error');
						$form.find('.help-inline').empty();
						$form.find('.alert').remove();
						
						if (response.status === 'FAIL') {
							for (var i = 0; i < response.result.length; i++) {
								var item = response.result[i];
                                                                var name= item.fieldName.replace('.','\\.');
								var $controlGroup = $('#' + name + 'ControlGroup');
								$controlGroup.addClass('error');
								$controlGroup.find('.help-inline').html(item.message);
							}
						} else {
							var $alert = $('<div class="alert"></div>');
							$alert.html(response.result);
							$alert.prependTo($form.find('fieldset'));
                                                        window.location.replace("#client/profile");
						}
					}, 'json');
					
					e.preventDefault();
					return false;
				});
			});